import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', component: StartScreenComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UserComponent },
];
