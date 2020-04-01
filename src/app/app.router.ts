import {Routes} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {PlaylistListComponent} from './playlists/playlist-list/playlist-list.component';
import {PlaylistsNewComponent} from './playlists/playlists-new/playlists-new.component';
import {PlaylistShowComponent} from './playlists/playlist-show/playlist-show.component';
import {ExploreComponent} from './explore/explore.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';

export const appRoutes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'auth/spotify/callback', component: LoginComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'playlists', component: PlaylistListComponent },
  { path: 'playlists/new', component: PlaylistsNewComponent },
  { path: 'playlists/:id', component: PlaylistShowComponent },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
