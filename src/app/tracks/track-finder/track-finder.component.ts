import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {Subject, Subscription} from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-track-finder',
  templateUrl: './track-finder.component.html',
  styleUrls: ['./track-finder.component.scss']
})
export class TrackFinderComponent implements OnInit, OnDestroy {

  searchResult;
  query: string = '';
  queryChanged: Subject<string> = new Subject<string>();
  private queryChangedSubscription: Subscription;
  @Input() playlist;

  @Output() trackSelected = new EventEmitter();

  constructor(
    private democraylistService: DemocraylistService,
  ) {
    this.queryChangedSubscription = this.queryChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(newQuery => {
        this.query = newQuery;
        this.searchTrack();
      });
  }

  ngOnInit(): void {
  }

  searchTrack(): void {
    if (this.query) {
      this.democraylistService.searchTracks(this.query)
        .subscribe(data => {
          this.searchResult = data;
          this.searchResult.forEach(result => result.disableAddButton = this.disabledButton(result.id));
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

  ngOnDestroy() {
    this.queryChangedSubscription.unsubscribe();
  }

  disabledButton(spotifyId: string): boolean {
    const spotifyIds = [];
    this.playlist.tracks.map(track => spotifyIds.push(track.spotify_id));
    this.playlist.tracks_submission.map(track => spotifyIds.push(track.spotify_id));
    this.playlist.tracks_archived.map(track => spotifyIds.push(track.spotify_id));
    console.log(spotifyIds);
    return spotifyIds.includes(spotifyId);
  }
}
