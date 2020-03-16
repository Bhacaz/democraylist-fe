import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  access_token: string;
  user: string;
  playlists: any = [];

  constructor(
    private route: ActivatedRoute,
    private democraticPlaylist: DemocraticPlaylistService
  ) {
    this.route.queryParams.subscribe(params => {
      const code = params.code;
      console.log(code);
      this.democraticPlaylist.getSpotifyToken(code).subscribe(response => {
        console.log(response);
        this.access_token = response.access_token;
        this.user = response.user;
        localStorage.setItem('access_token', this.access_token);
        this.getPlaylist();
      });
    });
  }

  ngOnInit(): void {

  }

  getPlaylist() {
    this.democraticPlaylist.getPlaylist()
      .subscribe((response => {
        console.log(response);
        this.playlists = response;
      }));
  }

}
