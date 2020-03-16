import {Routes} from "@angular/router";
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

export const appRoutes: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'auth/spotify/callback', component: HomeComponent },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
