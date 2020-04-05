import { Component, OnInit } from '@angular/core';
import {DemocraticPlaylistService} from '../../democraylist/democratic-playlist.service';
import {Router} from '@angular/router';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'app-playlists-new',
  templateUrl: './playlists-new.component.html',
  styleUrls: ['./playlists-new.component.scss']
})
export class PlaylistsNewComponent implements OnInit {

  name: string;
  description: string;
  song_size: number;

  constructor(private democraticPlaylist: DemocraticPlaylistService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.democraticPlaylist.newPlaylist({name: this.name, description: this.description, song_size: this.song_size}).subscribe(data => {
      this.router.navigate(['/playlists']);
    });
  }

}
