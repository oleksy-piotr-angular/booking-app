import { Routes } from '@angular/router';
import { SearchFormComponent } from './components/search-form/search-form.component';

export const SEARCH_ROUTES: Routes = [
  // host will mount this at /search
  { path: '', component: SearchFormComponent },
];
