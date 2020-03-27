import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit {

  playlists: Array<any> = [];

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists() {
    this.democraticPlaylistService.getPlaylists()
      .subscribe(data => this.playlists = data);
  }

  showPlaylist(id: number) {
    this.router.navigate(['/playlists', id]);
  }

}
