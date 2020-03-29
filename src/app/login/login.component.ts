import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user;
  playlists: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private democraticPlaylistService: DemocraticPlaylistService
  ) {
    if (!localStorage.getItem('access_token')) {
      this.route.queryParams.subscribe(params => {
        const code = params.code;
        console.log(code);
        this.democraticPlaylistService.getSpotifyToken(code).subscribe(response => {
          console.log(response);
          this.user = response.user;
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/']);
        });
      });
    }
  }

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
