// projects/listings-mfe/src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LISTINGS_ROUTES } from './listings.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(LISTINGS_ROUTES)],
};
