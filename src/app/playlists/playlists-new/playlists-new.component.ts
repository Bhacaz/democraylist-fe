import { Component, OnInit } from '@angular/core';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Playlist} from '../../models/playlist';

@Component({
  selector: 'app-playlists-new',
  templateUrl: './playlists-new.component.html',
  styleUrls: ['./playlists-new.component.scss']
})
export class PlaylistsNewComponent implements OnInit {
  playlistId: number;
  playlist = {
    name: '',
    description: '',
    song_size: 50
  };

  constructor(private democraylistService: DemocraylistService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
      if (this.playlistId) {
        this.democraylistService.getPlaylist(this.playlistId).subscribe(data => {
          this.playlist = data;
        });
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.playlistId) {
      this.democraylistService.updatePlaylist(this.playlist).subscribe(data => {
        this.redirectToPlaylist();
      });
    } else {
      this.democraylistService.newPlaylist({
        name: this.playlist.name,
        description: this.playlist.description,
        song_size: this.playlist.song_size
      }).subscribe(data => {
        this.playlistId = data.id;
        this.redirectToPlaylist();
      });
    }
  }

  redirectToPlaylist() {
    this.router.navigate(['/playlists', this.playlistId]);

  }

}
