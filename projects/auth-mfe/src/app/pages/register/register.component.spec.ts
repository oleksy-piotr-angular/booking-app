// register.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

describe('RegisterComponent (TDD)', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['register']);
    // our mock server returns { accessToken, user }, but tests only care that register() was called
    authSpy.register.and.returnValue(of({ id: 42, token: 'tkn' }));

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the RegisterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should pass name, email & password to AuthService.register()', () => {
    // grab the dynamic form instance
    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    // simulate user filling all 4 fields
    const formValue = {
      name: 'Test User',
      email: 'x@y.com',
      password: 'secret1',
      confirmPassword: 'secret1',
    };

    // emit submitted
    dyn.submitted.emit(formValue);

    // expect register() called once with name/email/password only
    expect(authSpy.register).toHaveBeenCalledOnceWith({
      name: 'Test User',
      email: 'x@y.com',
      password: 'secret1',
    });
  });

  it('should not call register() if passwords do not match', () => {
    // simulate mismatch
    const badValue = {
      name: 'Test User',
      email: 'x@y.com',
      password: 'abc123',
      confirmPassword: 'xyz789',
    };

    component.onSubmit(badValue);
    fixture.detectChanges();

    expect(authSpy.register).not.toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).toContain(
      'Passwords do not match'
    );
  });

  it('should show passwordMismatch error under confirmPassword', async () => {
    const dynDE = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    );
    const dynCmp = dynDE.componentInstance as DynamicFormComponent;

    // set form values directly, mark touched to trigger validators
    dynCmp.form.setValue({
      name: 'Test User',
      email: 'x@y.com',
      password: '123456',
      confirmPassword: '654321',
    });
    dynCmp.form.markAllAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();

    const matError =
      fixture.nativeElement.querySelector('mat-error').textContent;
    expect(matError).toContain('Passwords do not match');
  });

  it('should auto-login and redirect to Profile on successful register', () => {
    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    const formValue = {
      name: 'Test User',
      email: 'x@y.com',
      password: 'secret1',
      confirmPassword: 'secret1',
    };

    dyn.submitted.emit(formValue);

    expect(authSpy.register).toHaveBeenCalledWith({
      name: 'Test User',
      email: 'x@y.com',
      password: 'secret1',
    });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/profile']);
  });
});
