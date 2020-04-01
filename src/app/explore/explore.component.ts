import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  playlists: [];

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService
  ) { }

  ngOnInit(): void {
    this.democraticPlaylistService.getExplore()
      .subscribe(data => {
      this.playlists = data;
    });
  }

}
