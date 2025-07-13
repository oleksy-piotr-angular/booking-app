// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AUTH_MFE_SERVICE, IAuthService } from '@booking-app/auth-token';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

// Define Mock AuthService for testing
type UserProfile = {
  id: number;
  name: string;
  email: string;
};

// Define AuthService interface
interface AuthService {
  isAuthenticated$: Observable<boolean>;
}

// Define Mock AuthService for testing
class AuthService {
  isAuthenticated$: Observable<boolean> = of(false);
}

@Component({ selector: 'app-profile', template: '' })
class MockProfileComponent {}

class StubAuthService {
  getUserId(): number {
    return 1;
  }

  getProfile() {
    return of({
      id: 1,
      name: 'Piotr',
      email: 'piotr@example.com',
    });
  }

  isAuthenticated$ = of(true);
  logout(): void {}
}

describe('AppComponent (modern routing)', () => {
  // a fake profile so ProfileComponent will render without real HTTP
  const mockProfile: UserProfile = {
    id: 1,
    name: 'Piotr',
    email: 'piotr@example.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MockProfileComponent, HttpClientModule],
      providers: [
        provideRouter([
          { path: 'auth/profile', component: MockProfileComponent },
        ]),
        { provide: AUTH_MFE_SERVICE, useExisting: AuthService }, // connects token to service
        { provide: AuthService, useClass: StubAuthService }, // provides stub
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have the correct title`, () => {
    const fixture = TestBed.createComponent(AppComponent);

    // 🔄 Update to whatever your component actually sets:
    expect(fixture.componentInstance.title).toEqual('Booking App - DEMO');
  });

  it('should render the title in an h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1')!.textContent!;

    // 🔄 Update to match your template text:
    expect(h1).toContain('Booking App - DEMO');
  });

  it('should render ProfileComponent via federated route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);

    // Perform the navigation
    await router.navigate(['/auth/profile']);
    fixture.detectChanges();
    await fixture.whenStable();

    // Now the ProfileComponent tree should be in the DOM
    const text = fixture.nativeElement.textContent!;
    expect(text).toContain('Change Password');
    expect(text).toContain('Piotr');
    expect(text).toContain('piotr@example.com');
  });
});
