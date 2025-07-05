import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../services/auth/auth.service';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// ─── Test Helpers ───────────────────────────────────────────────────────────
function getDynFormComp(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(By.directive(DynamicFormComponent))
    .componentInstance as DynamicFormComponent;
}

function getFormErrorComp(fixture: ComponentFixture<any>) {
  return fixture.debugElement.query(By.directive(FormErrorComponent))
    .componentInstance as FormErrorComponent;
}

describe('ResetPasswordComponent (TDD)', () => {
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['resetPassword']);

    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ token: 'xyz' }) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    fixture.detectChanges();
  });

  it('renders password and confirmPassword fields', () => {
    const form = getDynFormComp(fixture);
    expect(form.config.map((f: FormFieldConfig) => f.name)).toEqual([
      'password',
      'confirmPassword',
    ]);
  });

  it('calls resetPassword and shows success', fakeAsync(() => {
    authSpy.resetPassword.and.returnValue(of(undefined));

    const form = getDynFormComp(fixture);
    form.submitted.emit({ password: 'abc', confirmPassword: 'abc' });

    tick();
    fixture.detectChanges();

    const errCmp = getFormErrorComp(fixture);
    expect(authSpy.resetPassword).toHaveBeenCalledWith('xyz', 'abc');
    expect(errCmp.message).toBe('Password has been reset.');
  }));

  it('shows error when reset fails', fakeAsync(() => {
    authSpy.resetPassword.and.returnValue(
      throwError(() => ({ error: { message: 'Invalid token' } }))
    );

    const form = getDynFormComp(fixture);
    form.submitted.emit({ password: 'abc', confirmPassword: 'abc' });

    tick();
    fixture.detectChanges();

    const errCmp = getFormErrorComp(fixture);
    expect(errCmp.message).toBe('Invalid token');
  }));
});
