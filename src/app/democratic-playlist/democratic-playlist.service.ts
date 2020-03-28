import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemocraticPlaylistService {

  backendUrl = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) { }

  getSpotifyAuthUrl(): Observable<any> {
    return this.http.get(this.backendUrl + '/auth/spotify_login_url');
  }

  getSpotifyToken(code: string): Observable<any> {
    return this.http.post(this.backendUrl + '/auth/spotify_get_token', { code });
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

}
