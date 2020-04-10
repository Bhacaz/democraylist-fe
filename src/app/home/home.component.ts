import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemocraylistService} from '../democraylist/democraylist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user;
  playlists: any = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private democraticPlaylist: DemocraylistService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.democraticPlaylist.getUser()
        .subscribe(data => {
          this.isLoading = false;
          this.user = data.user;
          }, error => this.redirectToLogin());
    } else {
      this.route.queryParams.subscribe(params => {
        const code = params.code;
        if (code) {
          this.democraticPlaylist.getSpotifyToken(code).subscribe(response => {
            this.isLoading = false;
            this.user = response.user;
            localStorage.setItem('access_token', response.access_token);
          });
        } else {
          this.isLoading = false;
          this.redirectToLogin();
        }
      });
    }
  }

  redirectToLogin() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
