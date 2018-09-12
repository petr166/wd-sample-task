import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ProposalsComponent } from './components/proposals/proposals.component';

import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuardService],
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      { path: 'proposals', component: ProposalsComponent },
      { path: '**', redirectTo: '/proposals' }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
