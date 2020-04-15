import { Component, OnInit } from '@angular/core';
import {DemocraylistService} from '../democraylist/democraylist.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user;
  playlists: any = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private democraylistService: DemocraylistService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('access_token')) {
      this.route.queryParams.subscribe(params => {
        const code = params.code;
        if (code) {
          this.democraylistService.getSpotifyToken(code).subscribe(response => {
            this.user = response.user;
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.router.navigate(['/']);
          });
        } else {
          this.isLoading = false;
        }
      });
    } else {
      this.authSpotify();
    }
  }

  authSpotify() {
    this.isLoading = true;
    localStorage.removeItem('access_token');
    this.democraylistService.getSpotifyAuthUrl().subscribe(response => {
      window.open(response.url, '_self');
    });
  }

}
