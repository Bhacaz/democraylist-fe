import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemocraylistService} from '../democraylist/democraylist.service';
import {SwPush} from '@angular/service-worker';
import {environment} from '../../environments/environment';

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
    private democraticPlaylist: DemocraylistService,
    private swPush: SwPush
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.democraticPlaylist.getUser()
        .subscribe(data => {
          this.isLoading = false;
          this.user = data.user;
          this.askForNotificationPermission();
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

  askForNotificationPermission() {
    const isEnabled = this.swPush.isEnabled;
    const isGranted = Notification.permission === 'granted';

    if (!isGranted && isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: environment.vapidPublicKey
      })
        .then(sub => this.democraticPlaylist.addPushSubscriber(sub).subscribe())
        .catch(err => console.error('Could not subscribe to notifications', err));
    }
  }
}
