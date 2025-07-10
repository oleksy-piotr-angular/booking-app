import { environment } from './../../../../environments/environment';
// app.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AUTH_MFE_SERVICE } from '@booking-app/auth-token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Booking App - DEMO';
  constructor() {
    if (!environment.production) {
      console.log('Host token instance:', AUTH_MFE_SERVICE);
    }
  }
}
