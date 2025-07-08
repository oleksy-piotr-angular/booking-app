// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AUTH_ROUTES } from './auth.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(AUTH_ROUTES)],
};
