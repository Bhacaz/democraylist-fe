import { Component, OnInit } from '@angular/core';
import {DemocraylistService} from '../democraylist/democraylist.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  playlists: [];

  constructor(
    private democraticPlaylistService: DemocraylistService
  ) { }

  ngOnInit(): void {
    this.democraticPlaylistService.getExplore()
      .subscribe(data => {
      this.playlists = data;
    });
  }

}
