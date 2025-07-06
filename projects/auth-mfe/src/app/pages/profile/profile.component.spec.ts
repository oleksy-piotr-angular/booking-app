import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AuthService, UserProfile } from '../../services/auth/auth.service';

describe('ProfileComponent (TDD)', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const mockProfile: UserProfile = {
      name: 'Piotr',
      email: 'piotr@example.com',
    };

    authSpy = {
      getProfile: jasmine.createSpy().and.returnValue(of(mockProfile)),
    } as Partial<AuthService> as jasmine.SpyObj<AuthService>;

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display user name and email', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Piotr');
    expect(text).toContain('piotr@example.com');
  });

  it('should navigate to /auth/change-password on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/auth',
      'change-password',
    ]);
  });
});
