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
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoadingComponent } from './common/loading/loading.component';
import {DialogModule} from 'primeng/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PlaylistStatsComponent } from './playlists/playlist-stats/playlist-stats.component';
import {TableModule} from 'primeng/table';
import { PlaylistHeaderComponent } from './playlists/playlist-header/playlist-header.component';
import { TabsComponent } from './common/tabs/tabs/tabs.component';
import { TabComponent } from './common/tabs/tab/tab.component';
import { SharedComponent } from './tracks/shared/shared.component';
import { PlaylistComponent } from './tracks/shared/playlist/playlist.component';
import { BottomSheetComponent } from './common/bottom-sheet/bottom-sheet.component';
import { BackToolbarComponent } from './common/back-toolbar/back-toolbar.component';
import { PlayslitAddTrackComponent } from './playlists/playslit-add-track/playslit-add-track.component';
import {RadioButtonModule} from 'primeng/radiobutton';

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
    SubscriptionsComponent,
    LoadingComponent,
    PlaylistStatsComponent,
    PlaylistHeaderComponent,
    TabsComponent,
    TabComponent,
    SharedComponent,
    PlaylistComponent,
    BottomSheetComponent,
    BackToolbarComponent,
    PlayslitAddTrackComponent
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
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    DialogModule,
    TableModule,
    RadioButtonModule,
    ServiceWorkerModule.register('./addon-service-worker.js', { enabled: environment.production })
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
