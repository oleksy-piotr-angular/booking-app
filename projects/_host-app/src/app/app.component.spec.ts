// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import {
  AuthService,
  UserProfile,
} from '../../../auth-mfe/src/app/services/auth/auth.service';
import { ProfileComponent } from '../../../auth-mfe/src/app/pages/profile/profile.component';

describe('AppComponent (modern routing)', () => {
  // a fake profile so ProfileComponent will render without real HTTP
  const mockProfile: UserProfile = {
    name: 'Piotr',
    email: 'piotr@example.com',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, ProfileComponent],
      providers: [
        provideRouter([{ path: 'auth/profile', component: ProfileComponent }]),
        {
          provide: AuthService,
          useValue: {
            getProfile: () => of(mockProfile),
          },
        },
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
    expect(fixture.componentInstance.title).toEqual('Booking App - Host'); // was 'host-app'
  });

  it('should render the title in an h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1')!.textContent!;

    // 🔄 Update to match your template text:
    expect(h1).toContain('Booking App - Host'); // was 'Host App'
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
