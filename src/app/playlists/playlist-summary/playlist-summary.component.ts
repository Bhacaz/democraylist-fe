import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist-summary',
  templateUrl: './playlist-summary.component.html',
  styleUrls: ['./playlist-summary.component.scss']
})
export class PlaylistSummaryComponent implements OnInit {

  @Input() playlist;

  constructor() { }

  ngOnInit(): void {
  }
}
