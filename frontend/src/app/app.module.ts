import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { LoginService } from './services/login.service';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { ProposalService } from './services/proposal.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProposalsComponent } from './components/proposals/proposals.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProposalsComponent,
    NavbarComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuardService,
    LoginGuardService,
    AuthenticationService,
    LoginService,
    UserService,
    ProposalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
