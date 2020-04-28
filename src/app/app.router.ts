import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {PlaylistsNewComponent} from './playlists/playlists-new/playlists-new.component';
import {PlaylistShowComponent} from './playlists/playlist-show/playlist-show.component';
import {PlaylistStatsComponent} from './playlists/playlist-stats/playlist-stats.component';
import {SharedComponent} from './tracks/shared/shared.component';

export const appRoutes: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'share',      component: SharedComponent },
  { path: 'auth/spotify/callback', component: LoginComponent },
  { path: 'playlists/new', component: PlaylistsNewComponent },
  { path: 'playlists/:id', component: PlaylistShowComponent },
  { path: 'playlists/:id/stats', component: PlaylistStatsComponent },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
