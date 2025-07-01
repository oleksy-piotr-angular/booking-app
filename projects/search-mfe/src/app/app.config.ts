import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SEARCH_ROUTES } from './search.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(SEARCH_ROUTES)],
};
// This configuration sets up the router for the search microfrontend, allowing it to handle its
// own routes independently.
