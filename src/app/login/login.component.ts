import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private democraticPlaylistService: DemocraticPlaylistService) { }

  ngOnInit(): void {
  }

  authSpotify() {
    localStorage.removeItem('access_token');
    this.democraticPlaylistService.getSpotifyAuthUrl().subscribe(response => {
      console.log(response);
      window.open(response.url, '_self');
    });
  }

}
