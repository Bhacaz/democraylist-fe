import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {startWith, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DemocraticPlaylistService {

  backendUrl = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) {
    // Every 10 minutes
    interval(1000 * 60 * 10).subscribe(x => {
      this.getRefreshAcessToken().subscribe(res => {
        localStorage.setItem('access_token', res.access_token);
      });
    });
  }

  getSpotifyAuthUrl(): Observable<any> {
    return this.http.get(this.backendUrl + '/auth/spotify_login_url');
  }

  getSpotifyToken(code: string): Observable<any> {
    return this.http.post(this.backendUrl + '/auth/spotify_get_token', { code });
  }

  getRefreshAcessToken(): Observable<any> {
    return this.http.get(this.backendUrl + '/auth/refresh_access_token');
  }

  getPlaylists(): Observable<any> {
    return this.http.get(this.backendUrl + '/playlists');
  }

  newPlaylist(playlist: any): Observable<any> {
    return this.http.post(this.backendUrl + '/playlists/create', { playlist });
  }

  getPlaylist(id: number): Observable<any> {
    return this.http.get(this.backendUrl + '/playlists/' + id);
  }

  getUser(): Observable<any> {
    return this.http.get(this.backendUrl + '/auth/user');
  }

  // TACKS

  searchTracks(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(this.backendUrl + '/tracks/search', {params});
  }

  addTrackToPlaylist(playlistId: number, trackId: string) {
    return this.http.post(this.backendUrl + '/playlists/' + playlistId + '/add_track', { track_id: trackId });
  }

  upVotePatch(trackId: number): Observable<any> {
    return this.http.patch(this.backendUrl + '/tracks/' + trackId + '/up_vote', {});
  }

  downVotePatch(trackId: number): Observable<any> {
    return this.http.patch(this.backendUrl + '/tracks/' + trackId + '/down_vote', {});
  }

  getExplore(): Observable<any> {
    return this.http.get(this.backendUrl + '/playlists/explore');
  }

  getSubscriptions(): Observable<any> {
    return this.http.get(this.backendUrl + '/playlists/subscriptions');
  }

  subscripbedToPlaylist(playlistId: number): Observable<any> {
    return this.http.post(this.backendUrl + '/playlists/' + playlistId + '/subscribed', {});
  }

  unsubscripbedToPlaylist(playlistId: number): Observable<any> {
    return this.http.post(this.backendUrl + '/playlists/' + playlistId + '/unsubscribed', {});
  }

}
