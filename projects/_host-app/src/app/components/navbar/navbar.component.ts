// navbar.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AUTH_MFE_SERVICE, IAuthService } from '../../tokens/auth.token';
import { MaterialModule } from '../../shared/material.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, NgIf, AsyncPipe, RouterModule],
  template: `
    <mat-toolbar>
      <ng-container *ngIf="auth.isAuthenticated$ | async">
        <!-- primary navigation -->
        <a mat-button [routerLink]="['/auth/profile']">👤 Profile</a>
        <a mat-button [routerLink]="['/hotel', 1]">🏨 Hotel 1</a>
        <a mat-button [routerLink]="['/search']">🔍 Search</a>
        <a mat-button [routerLink]="['/listings']">📋 Listings</a>

        <!-- spacer to push auth buttons to the right -->
        <span class="spacer"></span>
      </ng-container>

      <button
        mat-button
        *ngIf="!(auth.isAuthenticated$ | async)"
        routerLink="/auth/login"
      >
        Login
      </button>
      <button
        mat-button
        *ngIf="!(auth.isAuthenticated$ | async)"
        routerLink="/auth/register"
      >
        Register
      </button>
      <button
        mat-button
        class="logout"
        *ngIf="auth.isAuthenticated$ | async"
        (click)="logout()"
      >
        Logout
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class NavbarComponent {
  private router: Router = inject(Router);
  // Inject the AUTH_SERVICE token to get the auth service instance
  public auth: IAuthService = inject(AUTH_MFE_SERVICE);

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
