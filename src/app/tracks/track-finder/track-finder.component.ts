import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DemocraticPlaylistService} from '../../democratic-playlist/democratic-playlist.service';

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.component.html',
  styleUrls: ['./track-finder.component.scss']
})
export class TrackFinderComponent implements OnInit {

  searchResult;
  query: string = '';
  @Output() trackSelected = new EventEmitter();

  constructor(
    private democraticPlaylistService: DemocraticPlaylistService,
  ) { }

  ngOnInit(): void {
  }

  searchTrack(): void {
    if (this.query) {
      this.democraticPlaylistService.searchTracks(this.query)
        .subscribe(data => {
          this.searchResult = data;
        });
    } else {
      this.searchResult = null;
    }
  }

  trackAddedEvent(trackId) {
    this.query = '';
    this.trackSelected.emit(trackId);
    this.searchResult = undefined;
  }

}
