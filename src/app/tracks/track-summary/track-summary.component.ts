import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {PlaylistChangeService} from '../../democraylist/playlist-change.service';
import {AudioService} from '../audio-player.service';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-track-summary',
  templateUrl: './track-summary.component.html',
  styleUrls: ['./track-summary.component.scss']
})
export class TrackSummaryComponent implements OnInit, OnDestroy, OnChanges {

  @Input() track;
  @Input() playlist;
  trackIdsInPlaylist = [];
  showPlayButton: boolean = false;
  currentlyPlaying: boolean = false;
  audioPlayerSubscription;
  menuItems: MenuItem[];
  showInfo: boolean = false;
  trackId: number;

  constructor(
    private democraylistService: DemocraylistService,
    private voteService: PlaylistChangeService,
    private audioService: AudioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams
      .subscribe(params => {
        const trackId = params.track_id;
        if (trackId) {
          this.trackId = parseInt(trackId);
        }
      });
  }

  ngOnInit() {
    this.currentlyPlaying = this.audioService.currentlyPlayingTrackId === this.track.id;
    this.showPlayButton = this.currentlyPlaying;

    this.audioPlayerSubscription = this.audioService.audioPlayerEvent().subscribe(trackId => {
      this.currentlyPlaying = trackId === this.track.id;
      this.showPlayButton = this.currentlyPlaying;
    });
    this.menuItems = [
      {label: 'Open on spotify', icon: 'fa fa-spotify', command: this.openWithSpotify},
      {label: 'Show info', icon: 'fa fa-info-circle', command: this.toggleShowInfo}
    ];
    if (this.playlist && this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id) {
      this.menuItems.push({label: 'Remove', icon: 'fa fa-minus-circle', command: this.removeTrack});
    }
    this.setAddButtonDisabled();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.audioPlayerSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.playlist) {
      this.playlist = changes.playlist.currentValue;
      this.setAddButtonDisabled();
    }
  }

  upVote() {
    this.democraylistService.upVotePatch(this.track.id)
      .subscribe(data => {
        if (this.track.my_vote) {
          this.track.vote_count += 2;
        } else {
          this.track.vote_count += 1;
        }
        this.track.my_vote = 'up';
        this.voteService.voteChanged(this.track.playlist_id);
      });
  }

  downVote() {
    this.democraylistService.downVotePatch(this.track.id)
      .subscribe(data => {
        if (this.track.my_vote) {
          this.track.vote_count -= 1;
        }
        this.track.my_vote = 'down';
        this.voteService.voteChanged(this.track.playlist_id);
      });
  }

  mouseEnterPlayButton() {
    if (this.track.preview_url && !this.currentlyPlaying) {
      this.showPlayButton = true;
    }
  }

  mouseLeavePlayButton() {
    if (!this.currentlyPlaying) {
      this.showPlayButton = false;
    }
  }

  playPreview() {
    this.audioService.play(this.track.id, this.track.preview_url);
  }

  trackChangeTrigger() {
    this.democraylistService.addTrackToPlaylist(this.playlist.id, this.track.id).subscribe(data => {
      this.router.navigate(['playlists', this.playlist.id]);
    });
  }

  removeTrack = (event) => {
    this.democraylistService.removeTrackToPlaylist(this.track.id)
      .subscribe(res => this.voteService.voteChanged(this.playlist.id));
  }

  openWithSpotify = (event) => {
    window.open(this.track.uri, '_blank');
  }

  toggleShowInfo = (event) =>  {
    this.showInfo = true;
  }

  releaseDate(): string {
    const date = new Date(this.track.album.release_date);

    return date.toLocaleString('fr-CA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  showVotebutton(): boolean {
    return this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id ||
      this.playlist.subscribed;
  }

  focus(): boolean {
    return this.track.id === this.trackId;
  }

  artistiNames(): string {
    return this.track.artists.map(artist => artist.name).join(', ');
  }

  setAddButtonDisabled() {
    if (this.playlist) {
      this.playlist.tracks.map(track => this.trackIdsInPlaylist.push(track.spotify_id));
      this.playlist.tracks_submission.map(track => this.trackIdsInPlaylist.push(track.spotify_id));
      this.playlist.tracks_archived.map(track => this.trackIdsInPlaylist.push(track.spotify_id));
      this.track.disableAddButton = this.trackIdsInPlaylist.includes(this.track.id);
    }
  }
}
