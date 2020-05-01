import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-back-toolbar',
  templateUrl: './back-toolbar.component.html',
  styleUrls: ['./back-toolbar.component.scss']
})
export class BackToolbarComponent implements OnInit, OnChanges {

  @Input() redirectPath;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.redirectPath = changes.redirectPath.currentValue;
  }

}
