import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AUTH_ROUTES } from '../auth.routes';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';
import { AUTH_SERVICE } from '../services/auth.tokens';
import { TOKEN_SERVICE } from '../services/token.tokens';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(AUTH_ROUTES)],
  providers: [
    // real implementations
    AuthService,
    TokenService,

    // expose them via tokens
    { provide: AUTH_SERVICE, useExisting: AuthService },
    { provide: TOKEN_SERVICE, useExisting: TokenService },
  ],
})
export class RemoteEntryModule {
  static _AUTH_ROUTES = AUTH_ROUTES; // so the host can surface them
}
