import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user;
  playlists: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private democraticPlaylistService: DemocraticPlaylistService
  ) {
    if (localStorage.getItem('access_token')) {
      this.democraticPlaylistService.getUser()
        .subscribe(data => this.user = data.user);
    }
  }

  ngOnInit(): void {
  }

}
