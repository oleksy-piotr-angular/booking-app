import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DETAILS_ROUTES } from './details.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideRouter(DETAILS_ROUTES)],
};
