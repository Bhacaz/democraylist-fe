import { Component, OnInit } from '@angular/core';
import {DemocraylistService} from '../democraylist/democraylist.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  playlists: [];

  constructor(
    private democraticPlaylistService: DemocraylistService
  ) { }

  ngOnInit(): void {
    this.democraticPlaylistService.getSubscriptions()
      .subscribe(data => {
        this.playlists = data;
      });
  }

}
