import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '../../services/auth/auth.service';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ForgotPasswordComponent', () => {
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['forgotPassword']);

    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordComponent,
        NoopAnimationsModule, // ← prevents @transition* errors
      ],
      providers: [{ provide: AuthService, useValue: authSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges(); // ← run initial change detection
  });

  it('renders DynamicFormComponent with email field only', () => {
    // initial detectChanges() has already rendered the form
    const form = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    expect(form.config.length).toBe(1);
    expect(form.config[0].name).toBe('email');
  });

  it('calls AuthService.forgotPassword and shows success message', fakeAsync(() => {
    authSpy.forgotPassword.and.returnValue(of({}));

    // initial detectChanges() has already rendered the form
    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    dyn.submitted.emit({ email: 'user@example.com' });
    tick();
    fixture.detectChanges();

    const formError = fixture.debugElement.query(
      By.directive(FormErrorComponent)
    );
    expect(formError).not.toBeNull();
    expect((formError.componentInstance as FormErrorComponent).message).toBe(
      'Password reset email sent.'
    );
  }));

  it('shows an error if the request fails', fakeAsync(() => {
    authSpy.forgotPassword.and.returnValue(
      throwError(() => ({ error: { message: 'Email not found' } }))
    );

    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    dyn.submitted.emit({ email: 'unknown@example.com' });
    tick();
    fixture.detectChanges();

    const formError = fixture.debugElement.query(
      By.directive(FormErrorComponent)
    );
    expect(formError).not.toBeNull();
    expect((formError.componentInstance as FormErrorComponent).message).toBe(
      'Email not found'
    );
  }));
});
