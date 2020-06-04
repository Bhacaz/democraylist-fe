import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemocraylistService} from '../../democraylist/democraylist.service';
import {PlaylistChangeService} from '../../democraylist/playlist-change.service';
import {MenuItem, MessageService} from 'primeng/api';
import {copyToClipboard} from '../../common/copy-to-clipboard';
import {environment} from '../../../environments/environment';
import {BottomSheetComponent} from '../../common/bottom-sheet/bottom-sheet.component';

declare var navigator;

@Component({
  selector: 'app-playlist-show',
  templateUrl: './playlist-show.component.html',
  styleUrls: ['./playlist-show.component.scss'],
  providers: [MessageService]
})
export class PlaylistShowComponent implements OnInit, OnDestroy {

  playlistId: number;
  playlist: any;
  voteChangingSubscription;
  innerWidth: number;
  playMenuItem: MenuItem[];
  menuItems: MenuItem[];
  playOnTitle: string;
  @ViewChild('sheetComponent') sheetComponentView: BottomSheetComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private democraylistService: DemocraylistService,
    private voteService: PlaylistChangeService,
    private messageService: MessageService
  ) {
    this.route.params.subscribe(params => {
      this.playlistId = +params.id;
      this.getPlaylist();
    });

    this.voteChangingSubscription = this.voteService.voteChanging().subscribe(playlistId => this.getPlaylist());

    this.playMenuItem = [
      {label: 'Loading...', icon: 'fa fa-spinner'}];
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.voteChangingSubscription.unsubscribe();
  }

  getPlaylist() {
    this.democraylistService.getPlaylist(this.playlistId)
      .subscribe(data => this.playlist = data);
  }

  playTracks = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'tracks').subscribe();
  }

  playSubmissions = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'submissions').subscribe();
  }

  playUnvoted = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'unvoted').subscribe();
  }

  playUpVoted = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'upvoted').subscribe();
  }

  playDownVoted = (event) => {
    this.democraylistService.playQueue(this.playlistId, 'downvoted').subscribe();
  }

  showMenu(menu) {
    this.menuItems = [
      {label: 'Open on spotify', icon: 'fa fa-spotify', command: this.openWithSpotify},
      {label: 'Statistic', icon: 'fa fa-bar-chart', command: this.openStats}
    ];

    if (this.owner()) {
      this.menuItems.push({label: 'Edit', icon: 'fa fa-pencil', command: this.redirectToEdit});
    } else if (this.playlist.subscribed) {
      this.menuItems.push({label: 'Unsubscribe', icon: 'fa fa-heart', command: this.unsubscribed});
    } else {
      this.menuItems.push({label: 'Subscribe', icon: 'fa fa-heart-o', command: this.subscribed});
    }

    if (this.owner() || this.playlist.subscribed) {
      this.menuItems.push({label: 'Share playlist', icon: 'fa fa-share-alt', command: this.copyShareLink});
    }
    menu.toggle();
  }

  copyShareLink = (event) => {
    this.democraylistService.getPlaylistShareLink(this.playlist.id).subscribe(data => {
      const shareLink = environment.host + 'p/' + data.hash;
      if (navigator.share) {
        navigator.share({
          title: 'Democraylist',
          text: 'Contribute to my playlist on Democraylist. ' + this.playlist.name,
          url: shareLink,
        });
      } else {
        copyToClipboard(shareLink);
        this.sheetComponentView.close();
        this.messageService.add({severity: 'success', summary: 'Link copied to clipboard'});
      }
    });
  }

  unsubscribed = (event) => {
    this.democraylistService.unsubscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = false;
        this.router.navigate(['/']);
      });
  }

  subscribed = (event) => {
    this.democraylistService.subscripbedToPlaylist(this.playlist.id)
      .subscribe(data => {
        this.playlist.subscribed = true;
        this.router.navigate(['/playlists', this.playlist.id]);
      });
  }

  openWithSpotify = (event) => {
    window.open(this.playlist.uri, '_blank');
  }

  openStats = (event) => {
    this.router.navigate(['/playlists', this.playlist.id, 'stats']);
  }

  redirectToEdit = (evnet) => {
    this.router.navigate(['/playlists', this.playlist.id, 'edit']);
  }

  redirectToAddTrack() {
    this.router.navigate(['playlists', this.playlistId, 'add-track']);
  }

  owner(): boolean {
    return this.playlist.user_id === JSON.parse(localStorage.getItem('user')).id;
  }

  playButtonClicked(menu: any) {
    menu.toggle();

    let noDevice = true;
    this.playOnTitle = 'No active device';
    this.democraylistService.getUserPlayerDevices()
      .subscribe(
      data => {
        if (data.length > 0) {
          noDevice = false;
          this.playOnTitle = 'Play on ' + data[0].name;
        }

        this.playMenuItem = [
          {label: 'Tracks', icon: 'fa fa-music', command: this.playTracks, disabled: noDevice},
          {label: 'Submission', icon: 'fa fa-headphones', command: this.playSubmissions, disabled: noDevice},
          {label: 'Unvoted', icon: 'fa fa-question-circle', command: this.playUnvoted, disabled: noDevice},
          {label: 'Up voted', icon: 'fa fa-arrow-up', command: this.playUpVoted, disabled: noDevice},
          {label: 'Down voted', icon: 'fa fa-arrow-down', command: this.playDownVoted, disabled: noDevice}
        ];
      }
    );
  }
}
