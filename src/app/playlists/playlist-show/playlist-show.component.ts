import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {PlaylistChangeService} from '../../democraylist/playlist-change.service';
import {MenuItem} from 'primeng/api';
import {Menu} from 'primeng/menu';

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
  playMenuItem: MenuItem[];
  playOnTitle: string;

  constructor(
    private route: ActivatedRoute,
    private democraylistService: DemocraylistService,
    private voteService: PlaylistChangeService
  ) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
      this.getPlaylist();
    });

    this.voteChangingSubscription = this.voteService.voteChanging().subscribe(playlistId => this.getPlaylist());

    this.playMenuItem = [
      {label: 'Loading...', icon: 'fa fa-spinner'}];
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
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

  playTracks = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'tracks').subscribe();
  }

  playSubmissions = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'submissions').subscribe();
  }

  playUnvoted = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'unvoted').subscribe();
  }

  playButtonClicked(menu: any) {
    menu.toggle();

    let noDevice = true;
    let text = 'No active device';
    this.democraylistService.getUserPlayerDevices()
      .subscribe(
      data => {
        if (data.length > 0) {
          noDevice = false;
          this.playOnTitle = 'Play on ' + data[0].name;
        }

        this.playMenuItem = [
          {label: 'Tracks', icon: 'fa fa-music', command: this.playTracks, disabled: noDevice},
          {label: 'Submission', icon: 'fa fa-headphones', command: this.playSubmissions, disabled: noDevice},
          {label: 'Unvoted', icon: 'fa fa-question-circle', command: this.playUnvoted, disabled: noDevice}
        ];
      }
    );
  }
}
