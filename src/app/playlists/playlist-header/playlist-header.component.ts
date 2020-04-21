import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.scss']
})
export class PlaylistHeaderComponent implements OnInit {

  @Input() playlist;

  constructor() { }

  ngOnInit() {

  }
}
