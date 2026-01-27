import { Routes } from '@angular/router';
import { Landing } from './pages/public/landing/landing';
import { Home} from './pages/home/home';
import { Login } from './pages/public/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full' 
  },
  {
    path: '',
    component: Landing, 
  },
  {
    path: 'login',
    component: Login, 
  },
  {
    path: 'home',
    component: Home, 
  },
];