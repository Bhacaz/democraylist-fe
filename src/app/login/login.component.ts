import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private democraticPlaylistService: DemocraticPlaylistService) { }

  ngOnInit(): void {
  }

  authSpotify() {
    console.log('hello');
    this.democraticPlaylistService.getSpotifyAuthUrl().subscribe(response => {
      console.log(response);
      window.open(response.url, '_self');
    });
  }

}
