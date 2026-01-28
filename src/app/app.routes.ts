import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Landing } from './pages/public/landing/landing';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { HomeLayout } from './pages/guard/home/home-layout/home-layout';

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
    component: HomeLayout, 
  },
];