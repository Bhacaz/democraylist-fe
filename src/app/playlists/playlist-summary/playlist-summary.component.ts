import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-playlist-summary',
  templateUrl: './playlist-summary.component.html',
  styleUrls: ['./playlist-summary.component.scss']
})
export class PlaylistSummaryComponent implements OnInit {

  @Input() playlist;

  constructor(
    private router: Router,
    private democraticPlaylistService: DemocraticPlaylistService
  ) { }

  ngOnInit(): void {
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
}