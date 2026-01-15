import { Routes } from '@angular/router';
import { Health } from './pages/health/health';
import { Home} from './pages/home/home';

export const routes: Routes = [
  { path: 'health', component: Health },
  { path: 'home', component: Home },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];