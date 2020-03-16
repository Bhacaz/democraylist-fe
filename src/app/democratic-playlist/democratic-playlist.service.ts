import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemocraticPlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  getSpotifyAuthUrl(): Observable<any> {
    return this.http.get('http://localhost:3000/auth/spotify_login_url');
  }

  getSpotifyToken(code: string): Observable<any> {
    return this.http.post('http://localhost:3000/auth/spotify_get_token', { 'code': code });
  }

  getPlaylist(): Observable<any> {
    return this.http.get('http://localhost:3000/playlists');
  }
}
