import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';
import {VoteService} from '../../democratic-playlist/vote.service';
import {AudioService} from '../audio-player.service';

@Component({
  selector: 'app-track-summary',
  templateUrl: './track-summary.component.html',
  styleUrls: ['./track-summary.component.scss']
})
export class TrackSummaryComponent implements OnInit, OnDestroy {

  @Input() track;
  showPlayButton: boolean = false;
  currentlyPlaying: boolean = false;
  audioPlayerSubscription;

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService,
    private voteService: VoteService,
    private audioService: AudioService
  ) { }

  ngOnInit(): void {
    this.currentlyPlaying = this.audioService.currentlyPlayingTrackId === this.track.id;
    this.showPlayButton = this.currentlyPlaying;

    this.audioPlayerSubscription = this.audioService.audioPlayerEvent().subscribe(trackId => {
      this.currentlyPlaying = trackId === this.track.id;
      this.showPlayButton = this.currentlyPlaying;
    });
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
}
