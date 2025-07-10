// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'environments/environment';
import { AUTH_MFE_SERVICE } from '@booking-app/auth-token';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public title = 'auth-mfe';
  constructor() {
    if (!environment.production) {
      console.log('Host token instance:', AUTH_MFE_SERVICE);
    }
  }
}
