import { Routes } from '@angular/router';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';

export const DETAILS_ROUTES: Routes = [
  { path: 'hotel/:id', component: HotelDetailsComponent },
];
