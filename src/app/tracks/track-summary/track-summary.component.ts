import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DemocraticPlaylistService} from '../../democraylist/democratic-playlist.service';
import {PlaylistChangeService} from '../../democraylist/playlist-change.service';
import {AudioService} from '../audio-player.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-track-summary',
  templateUrl: './track-summary.component.html',
  styleUrls: ['./track-summary.component.scss']
})
export class TrackSummaryComponent implements OnInit, OnDestroy {

  @Input() track;
  @Input() playlist;
  @Output() playlistChange = new EventEmitter();
  showPlayButton: boolean = false;
  currentlyPlaying: boolean = false;
  audioPlayerSubscription;
  menuItems: MenuItem[];

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService,
    private voteService: PlaylistChangeService,
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.currentlyPlaying = this.audioService.currentlyPlayingTrackId === this.track.id;
    this.showPlayButton = this.currentlyPlaying;

    this.audioPlayerSubscription = this.audioService.audioPlayerEvent().subscribe(trackId => {
      this.currentlyPlaying = trackId === this.track.id;
      this.showPlayButton = this.currentlyPlaying;
    });
    this.menuItems = [
      {label: 'Open with spotify', icon: 'fa fa-spotify', command: this.openWithSpotify}
    ];
    if (this.playlist && this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id) {
      this.menuItems.push({label: 'Remove', icon: 'fa fa-minus-circle', command: this.removeTrack});
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.audioPlayerSubscription.unsubscribe();
  }

  upVote() {
    this.democraticPlaylistService.upVotePatch(this.track.id)
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
    this.democraticPlaylistService.downVotePatch(this.track.id)
      .subscribe(data => {
        if (this.track.my_vote) {
          this.track.vote_count -= 2;
        } else {
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
    this.playlistChange.emit(this.track.id);
  }

  removeTrack = (event) => {
    this.democraticPlaylistService.removeTrackToPlaylist(this.playlist.id, this.track.spotify_id)
      .subscribe(res => this.voteService.voteChanged(this.playlist.id));
  }

  openWithSpotify = (event) => {
    window.open(this.track.uri);
  }
}
