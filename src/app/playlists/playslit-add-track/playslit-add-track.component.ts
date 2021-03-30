import {Component, Input, OnInit} from '@angular/core';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-playslit-add-track',
  templateUrl: './playslit-add-track.component.html',
  styleUrls: ['./playslit-add-track.component.scss']
})
export class PlayslitAddTrackComponent implements OnInit {

  playlist;
  playlistId;
  recentlyPlayedTracks = [];
  recommendations = [];
  showTrackFinder;

  constructor(private democraylistService: DemocraylistService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
      if (this.playlistId) {
        this.democraylistService.getPlaylist(this.playlistId).subscribe(data => {
          this.playlist = data;
          this.showTrackFinder = this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id ||
            this.playlist.subscribed;
        });
      }
    });
    this.getRecentlyPlayed();
    this.getRecommendations();
  }

  ngOnInit(): void {

  }

  getRecentlyPlayed() {
    this.democraylistService.getRecentlyPlayedTracks().subscribe(data => {
      this.recentlyPlayedTracks = data;
    });
  }

  getRecommendations() {
    this.democraylistService.getPlaylisRecommendations(this.playlistId).subscribe(data => {
      this.recommendations = data;
    });
  }

  addTrack(trackId: string) {
    this.democraylistService.addTrackToPlaylist(this.playlistId, trackId)
      .subscribe(data => {
        this.playlist = data;
        this.router.navigate(['playlists', this.playlistId]);
      });
  }
}
