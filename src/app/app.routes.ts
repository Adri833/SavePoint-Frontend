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
    children: [
      {
        path: 'biblioteca',
        loadComponent: () => import('./pages/guard/home/biblioteca/biblioteca').then(m => m.Biblioteca),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/guard/home/dashboard/dashboard').then(m => m.Dashboard),
      },
      {
        path: 'game/:id',
        loadComponent: () => import('./pages/guard/home/game-detail/game-detail').then(m => m.GameDetail),
      },
    ]
  },

];