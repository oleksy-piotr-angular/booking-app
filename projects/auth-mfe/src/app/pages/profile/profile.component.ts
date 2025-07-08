// profile.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, UserProfile } from '../../services/auth/auth.service';

@Component({
  selector: 'am-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="profile">
      <h2>{{ profile.name }}</h2>
      <p>{{ profile.email }}</p>
      <button (click)="changePassword()">Change Password</button>
    </section>
  `,
})
export class ProfileComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  public profile: UserProfile | null = null;

  ngOnInit() {
    this.auth.getProfile().subscribe((user) => {
      this.profile = user;
    });
  }

  changePassword() {
    this.router.navigate(['/auth', 'change-password']);
  }
}
