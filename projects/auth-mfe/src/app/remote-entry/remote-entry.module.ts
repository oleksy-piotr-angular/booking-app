import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';
import { AUTH_ROUTES } from '../auth.routes';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService, TokenService],
})
export class RemoteEntryModule {
  // surface the routes so the host can pick them up
  static _AUTH_ROUTES = AUTH_ROUTES;
}
