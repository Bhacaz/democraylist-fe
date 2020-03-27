import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-playlist-show',
  templateUrl: './playlist-show.component.html',
  styleUrls: ['./playlist-show.component.scss']
})
export class PlaylistShowComponent implements OnInit {

  playlistId: number;
  playlist: any;

  constructor(
    private route: ActivatedRoute,
    private democraticPlaylistService: DemocraticPlaylistService,
  ) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
    });
  }

  ngOnInit(): void {
    this.getPlaylist();
  }

  getPlaylist() {
    this.democraticPlaylistService.getPlaylist(this.playlistId)
      .subscribe(data => this.playlist = data);
  }

  addTrack(trackId: string) {
    this.democraticPlaylistService.addTrackToPlaylist(this.playlistId, trackId)
      .subscribe(data => this.playlist = data);
  }
}
