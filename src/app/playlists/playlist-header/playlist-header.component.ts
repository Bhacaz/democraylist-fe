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
    this.menuItems = [
      {label: 'Open on spotify', icon: 'fa fa-spotify', command: this.openWithSpotify},
      {label: 'Statistic', icon: 'fa fa-bar-chart', command: this.openStats},
      {label: 'Unsubscribe', icon: 'fa fa-heart', command: this.unsubscribed}
    ];
  }

  unsubscribed = (event) => {
    this.democraylistService.unsubscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = false;
        this.router.navigate(['/']);
      });
  }

  openWithSpotify = (event) => {
    window.open(this.playlist.uri, '_blank');
  }

  openStats = (event) => {
    console.log('123');
    this.router.navigate(['/playlists', this.playlist.id, 'stats']);
  }
}
