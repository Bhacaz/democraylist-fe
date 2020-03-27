import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-track-summary',
  templateUrl: './track-summary.component.html',
  styleUrls: ['./track-summary.component.scss']
})
export class TrackSummaryComponent implements OnInit {

  @Input() track;

  constructor() { }

  ngOnInit(): void {
  }

}
