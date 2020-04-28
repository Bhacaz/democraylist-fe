import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {

  params;
  constructor(
    private route: ActivatedRoute,
  ) {
      this.route.queryParams.subscribe(params => {
        this.params = JSON.stringify(params);
      });
  }

    ngOnInit(): void {
  }

}
