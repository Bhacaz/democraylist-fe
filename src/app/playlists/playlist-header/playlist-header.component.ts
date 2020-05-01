import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {DemocraylistService} from '../../democraylist/democraylist.service';

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.scss']
})
export class PlaylistHeaderComponent implements OnInit {

  @Input() playlist;
  menuItems: MenuItem[];

  constructor(
    private router: Router,
    private democraylistService: DemocraylistService
  ) { }

  ngOnInit(): void {

  }

  unsubscribed = (event) => {
    this.democraylistService.unsubscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = false;
        this.router.navigate(['/']);
      });
  }

  subscribed = (event) => {
    this.democraylistService.subscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = true;
      });
  }

  openWithSpotify = (event) => {
    window.open(this.playlist.uri, '_blank');
  }

  openStats = (event) => {
    this.router.navigate(['/playlists', this.playlist.id, 'stats']);
  }

  redirectToEdit = (evnet) => {
    this.router.navigate(['/playlists', this.playlist.id, 'edit']);
  }

  owner(): boolean {
    return this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id;
  }

  showMenu(menu) {
    this.menuItems = [
      {label: 'Open on spotify', icon: 'fa fa-spotify', command: this.openWithSpotify},
      {label: 'Statistic', icon: 'fa fa-bar-chart', command: this.openStats}
    ];

    if (this.owner()) {
      this.menuItems.push({label: 'Edit', icon: 'fa fa-pencil', command: this.redirectToEdit});
    } else if (this.playlist.subscribed) {
      this.menuItems.push({label: 'Unsubscribe', icon: 'fa fa-heart', command: this.unsubscribed});
    } else {
      this.menuItems.push({label: 'Subscribe', icon: 'fa fa-heart-o', command: this.subscribed});
    }
    menu.toggle();
  }
}
