// host.routes.ts

import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { hostAuthGuard } from './guards/host-auth.guard';
import { RemoteEntry, REMOTES } from './remotes';

type RemoteName = RemoteEntry['remoteName'];
type RemoteEntryUrl = RemoteEntry['remoteEntry'];

// helper to fetch entry for a given remoteName
function entry(remoteName: RemoteName): RemoteEntryUrl {
  const found = REMOTES.find((r) => r.remoteName === remoteName);
  if (!found) throw new Error(`Missing remote entry for ${remoteName}`);
  return found.remoteEntry;
}

export const HOST_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: entry('auth-mfe'),
        remoteName: 'auth-mfe',
        exposedModule: './AuthRoutes',
      }).then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'search',
    canMatch: [hostAuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: entry('search-mfe'),
        remoteName: 'search-mfe',
        exposedModule: './SearchRoutes',
      }).then((m) => m.SEARCH_ROUTES),
  },

  {
    path: 'hotel/:id',
    canMatch: [hostAuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: entry('details-mfe'),
        remoteName: 'details-mfe',
        exposedModule: './DetailsRoutes',
      }).then((m) => m.DETAILS_ROUTES),
  },

  {
    path: 'listings',
    canMatch: [hostAuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: entry('listings-mfe'),
        remoteName: 'listings-mfe',
        exposedModule: './ListingsRoutes',
      }).then((m) => m.LISTINGS_ROUTES),
  },

  { path: '**', component: NotFoundComponent },
];
