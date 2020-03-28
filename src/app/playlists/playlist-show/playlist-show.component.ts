import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';
import {VoteService} from '../../democratic-playlist/vote.service';

@Component({
  selector: 'app-playlist-show',
  templateUrl: './playlist-show.component.html',
  styleUrls: ['./playlist-show.component.scss']
})
export class PlaylistShowComponent implements OnInit, OnDestroy {

  playlistId: number;
  playlist: any;
  voteChangingSubscription;

  constructor(
    private route: ActivatedRoute,
    private democraticPlaylistService: DemocraticPlaylistService,
    private voteService: VoteService
  ) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
    });

    this.voteChangingSubscription = this.voteService.voteChanging().subscribe(playlistId => this.getPlaylist());
  }

  ngOnInit(): void {
    this.getPlaylist();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.voteChangingSubscription.unsubscribe();
  }

  getPlaylist() {
    this.democraticPlaylistService.getPlaylist(this.playlistId)
      .subscribe(data => this.playlist = data);
  }

  addTrack(trackId: string) {
    this.democraticPlaylistService.addTrackToPlaylist(this.playlistId, trackId)
      .subscribe(data => this.playlist = data);
  }
}
