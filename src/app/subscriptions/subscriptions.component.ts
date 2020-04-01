import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  playlists: [];

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService
  ) { }

  ngOnInit(): void {
    this.democraticPlaylistService.getSubscriptions()
      .subscribe(data => {
        this.playlists = data;
      });
  }

}
