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

  readonly VAPID_PUBLIC_KEY = 'BEWrjXKrN7b4hUiqIV-cLYJvUjTI_ntQXV3kz7ZIWgBnbzSl-jvG8hzamjK71cKsBaSrF0pwwdl6TOEH9Lguk4Q';
  readonly VAPID_PRIVATE_KEY = 'KuAGjOmk7elO3S6MDZS3_tbW63fFsgZDIN_FPfA_13M';

  constructor(
    private swPush: SwPush,
    private democraticPlaylist: DemocraylistService
  ) {}

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.democraticPlaylist.addPushSubscriber(sub).subscribe())
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
  //
  // async subscribeToPush() {
  //   try {
  //     const sub = await this.swPush.requestSubscription({
  //       serverPublicKey: this.VAPID_PUBLIC_KEY,
  //     });
  //     this.democraticPlaylist.addPushSubscriber(sub.toJSON());
  //   } catch (err) {
  //     console.error('Could not subscribe due to:', err);
  //   }
  // }
}
