import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-playlist-summary',
  templateUrl: './playlist-summary.component.html',
  styleUrls: ['./playlist-summary.component.scss']
})
export class PlaylistSummaryComponent implements OnInit {

  @Input() playlist;
  menuItems: MenuItem[];

  constructor(
    private router: Router,
    private democraticPlaylistService: DemocraylistService
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      {label: 'Open on spotify', icon: 'fa fa-spotify', command: this.openWithSpotify},
    ];
  }

  showPlaylist() {
    this.router.navigate(['/playlists', this.playlist.id]);
  }

  subscribed() {
    this.democraticPlaylistService.subscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = true;
      });
  }

  unsubscribed() {
    this.democraticPlaylistService.unsubscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = false;
      });
  }

  my_playlist(): boolean {
    return this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id;
  }

  openWithSpotify = (event) => {
    window.open(this.playlist.uri);
  }
}
