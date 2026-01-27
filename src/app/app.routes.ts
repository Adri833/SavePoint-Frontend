import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Landing } from './pages/public/landing/landing';
import { Home} from './pages/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';

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
    path: 'register',
    component: Register,
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: Home, 
  },
];