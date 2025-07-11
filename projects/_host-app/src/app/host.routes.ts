// host.routes.ts
// projects/_host-app/src/app/host.routes.ts

import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// ← import your functional guard
import { hostAuthGuard } from './guards/host-auth.guard';

export const HOST_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  // auth UI stays unguarded
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/authRemoteEntry.js', // adjust port/path as needed
        exposedModule: './AuthRoutes', // adjust to your remote's config
      }).then((m) => m.AUTH_ROUTES),
  },

  // everything else requires authentication
  {
    path: 'search',
    canMatch: [hostAuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/searchRemoteEntry.js',
        exposedModule: './SearchRoutes',
      }).then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'hotel/:id',
    canMatch: [hostAuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/detailsRemoteEntry.js',
        exposedModule: './DetailsRoutes',
      }).then((m) => m.DETAILS_ROUTES),
  },
  {
    path: 'listings',
    canMatch: [hostAuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4204/listingsRemoteEntry.js',
        exposedModule: './ListingsRoutes',
      }).then((m) => m.LISTINGS_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
