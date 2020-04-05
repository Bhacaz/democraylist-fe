import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {appRoutes} from './app.router';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {AuthInterceptor} from './democraylist/auth-interceptor';
import { PlaylistSummaryComponent } from './playlists/playlist-summary/playlist-summary.component';
import { PlaylistListComponent } from './playlists/playlist-list/playlist-list.component';
import { PlaylistsNewComponent } from './playlists/playlists-new/playlists-new.component';
import {FormsModule} from '@angular/forms';
import { PlaylistShowComponent } from './playlists/playlist-show/playlist-show.component';
import { TrackFinderComponent } from './tracks/track-finder/track-finder.component';
import { TrackSummaryComponent } from './tracks/track-summary/track-summary.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ExploreComponent } from './explore/explore.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {MenuModule} from 'primeng/menu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PlaylistSummaryComponent,
    PlaylistListComponent,
    PlaylistsNewComponent,
    PlaylistShowComponent,
    TrackFinderComponent,
    TrackSummaryComponent,
    ToolbarComponent,
    ExploreComponent,
    SubscriptionsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    InputTextModule,
    ButtonModule,
    TabViewModule,
    MenuModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
