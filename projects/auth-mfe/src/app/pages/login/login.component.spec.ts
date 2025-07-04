import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { LoginComponent } from './login.component';
import { AuthService, LoginPayload } from '../../services/auth/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideLocationMocks } from '@angular/common/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
        provideRouter([]), // 👈 your test routes here
        provideLocationMocks, // 👈 mocks Location & LocationStrategy
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  });

  it('renders DynamicFormComponent with email & password fields', () => {
    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    expect(dyn.config.map((f) => f.name)).toEqual(['email', 'password']);
  });

  it('calls AuthService.login and navigates on success', () => {
    const payload: LoginPayload = { email: 'a@b.com', password: 'pw' };
    authSpy.login.and.returnValue(of({ token: 'x' }));

    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    dyn.submitted.emit(payload);

    expect(authSpy.login).toHaveBeenCalledWith(payload);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('displays an error message when login fails', () => {
    const dyn = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    ).componentInstance;

    authSpy.login.and.returnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    dyn.submitted.emit({ email: 'user@test.com', password: 'badpass' });
    fixture.detectChanges();

    const errEl = fixture.debugElement.query(By.css('.error-message'))
      ?.nativeElement as HTMLElement;

    expect(errEl?.textContent).toContain('Invalid credentials');
  });

  it('shows server error and leaves validation errors visible', () => {
    const dyn = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    ).componentInstance;

    // Instead of mocking the form, we can directly set it up
    dyn.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    authSpy.login.and.returnValue(
      throwError(() => ({ error: { message: 'Invalid credentials' } }))
    );

    dyn.submitted.emit({ email: '', password: 'badpass' });
    fixture.detectChanges();

    const errEl = fixture.debugElement.query(By.css('.error-message'))
      ?.nativeElement as HTMLElement;

    expect(errEl?.textContent).toContain('Invalid credentials');
  });
});
