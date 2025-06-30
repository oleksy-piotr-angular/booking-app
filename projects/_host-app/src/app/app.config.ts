import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HOST_ROUTES } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(HOST_ROUTES)],
};
