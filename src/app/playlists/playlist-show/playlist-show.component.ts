import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {PlaylistChangeService} from '../../democraylist/playlist-change.service';

@Component({
  selector: 'app-playlist-show',
  templateUrl: './playlist-show.component.html',
  styleUrls: ['./playlist-show.component.scss']
})
export class PlaylistShowComponent implements OnInit, OnDestroy {

  playlistId: number;
  playlist: any;
  voteChangingSubscription;
  innerWidth: number;

  constructor(
    private route: ActivatedRoute,
    private democraylistService: DemocraylistService,
    private voteService: PlaylistChangeService
  ) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
    });

    this.voteChangingSubscription = this.voteService.voteChanging().subscribe(playlistId => this.getPlaylist());
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.getPlaylist();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.voteChangingSubscription.unsubscribe();
  }

  getPlaylist() {
    this.democraylistService.getPlaylist(this.playlistId)
      .subscribe(data => this.playlist = data);
  }

  addTrack(trackId: string) {
    this.democraylistService.addTrackToPlaylist(this.playlistId, trackId)
      .subscribe(data => this.playlist = data);
  }

  showTrackFinder(): boolean {
    return this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id ||
      this.playlist.subscribed;
  }
}
