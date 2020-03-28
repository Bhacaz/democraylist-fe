import {Component, Input, OnInit} from '@angular/core';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-track-summary',
  templateUrl: './track-summary.component.html',
  styleUrls: ['./track-summary.component.scss']
})
export class TrackSummaryComponent implements OnInit {

  @Input() track;

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService
  ) { }

  ngOnInit(): void {
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
      });
  }
}
