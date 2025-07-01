import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const HOST_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module', // <-- ES module remote
        remoteEntry: 'http://localhost:4201/authRemoteEntry.js',
        exposedModule: './AuthRoutes', // matches your expose name
      }).then((m) => m.AUTH_ROUTES), // grabs the exported const from auth-mfe
  },
  {
    path: 'search',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/searchRemoteEntry.js',
        exposedModule: './SearchRoutes',
      }).then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'hotel/:id',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/detailsRemoteEntry.js',
        exposedModule: './DetailsRoutes',
      }).then((m) => m.DETAILS_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
