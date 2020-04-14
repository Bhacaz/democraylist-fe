import { Component, OnInit } from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {DemocraylistService} from '../../democraylist/democraylist.service';

@Component({
  selector: 'app-try-notif',
  templateUrl: './try-notif.component.html',
  styleUrls: ['./try-notif.component.scss']
})
export class TryNotifComponent implements OnInit {

  ngOnInit(): void {
  }

  readonly VAPID_PUBLIC_KEY = 'BP9uDw_wbrIxQzuSbDDXj3XmFZ7B3cYrA_4VA6WJo6MOI-gxliw-MSwARYIbAj299jFn6TyEBSDbbN9Tujui8Zo=';

  constructor(
    private swPush: SwPush,
    private democraticPlaylist: DemocraylistService
  ) {}



  subscribeToNotifications() {
    console.log('123');
    console.log(this.swPush.isEnabled);
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.democraticPlaylist.addPushSubscriber(sub.toJSON()).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

}
