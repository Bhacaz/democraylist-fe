import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  playlists: any = [];

  constructor(
    private route: ActivatedRoute,
    private democraticPlaylist: DemocraticPlaylistService
  ) {
    if (localStorage.getItem('access_token')) {
      this.democraticPlaylist.getUser()
        .subscribe(data => this.user = data.user);
    } else {
      this.route.queryParams.subscribe(params => {
        const code = params.code;
        this.democraticPlaylist.getSpotifyToken(code).subscribe(response => {
          this.user = response.user;
          localStorage.setItem('access_token', response.access_token);
        });
      });
    }
  }

  ngOnInit(): void {

  }
}
