import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {DemocraylistService} from '../../democraylist/democraylist.service';

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.scss']
})
export class PlaylistHeaderComponent implements OnInit {

  @Input() playlist;

  constructor(
    private router: Router,
    private democraylistService: DemocraylistService
  ) { }

  ngOnInit(): void {

  }

}
