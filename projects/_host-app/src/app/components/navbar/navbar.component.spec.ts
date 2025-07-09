import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { AUTH_MFE_SERVICE, IAuthService } from '../../tokens/auth.token';

describe('NavbarComponent (TDD)', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let authSpy: jasmine.SpyObj<IAuthService>;
  let isAuth$: BehaviorSubject<boolean>;

  beforeEach(async () => {
    isAuth$ = new BehaviorSubject(false);
    authSpy = jasmine.createSpyObj<IAuthService>('IAuthService', ['logout'], {
      isAuthenticated$: isAuth$,
    });

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterModule.forRoot([]), // <-- brings in routerLink directives
        MatToolbarModule,
        MatButtonModule,
        NavbarComponent, // <-- imports the NavbarComponent
      ],
      providers: [
        provideLocationMocks(), // mocks Location+LocationStrategy
        { provide: AUTH_MFE_SERVICE, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  });

  it('shows Login & Register when not authenticated', () => {
    const btns = fixture.debugElement.queryAll(By.css('button[mat-button]'));
    expect(btns.map((b) => b.nativeElement.textContent.trim())).toEqual([
      'Login',
      'Register',
    ]);
  });

  it('shows Logout when authenticated', () => {
    isAuth$.next(true);
    fixture.detectChanges();

    const logoutBtn = fixture.debugElement.query(
      By.css('button.logout[mat-button]')
    );
    expect(logoutBtn).toBeTruthy();

    const others = fixture.debugElement.queryAll(
      By.css('button[mat-button]:not(.logout)')
    );
    expect(others.length).toBe(0);
  });

  it('calls logout() on Logout click', () => {
    isAuth$.next(true);
    fixture.detectChanges();

    fixture.debugElement
      .query(By.css('button.logout[mat-button]'))
      .triggerEventHandler('click', null);

    expect(authSpy.logout).toHaveBeenCalled();
  });
});
