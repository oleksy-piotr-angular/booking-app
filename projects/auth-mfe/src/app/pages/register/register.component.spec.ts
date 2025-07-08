// register.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { RegisterComponent } from './register.component';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { of } from 'rxjs';

describe('RegisterComponent (TDD)', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj('AuthService', ['register']);
    authSpy.register.and.returnValue(of({ userId: 42 }));

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: authSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should pass email/password payload to AuthService.register()', () => {
    // grab DynamicFormComponent instance
    const dyn = fixture.debugElement.query(By.directive(DynamicFormComponent))
      .componentInstance as DynamicFormComponent;

    // simulate user submit with all 3 fields
    const formValue = {
      email: 'x@y.com',
      password: 'secret1',
      confirmPassword: 'secret1',
    };
    dyn.submitted.emit(formValue);

    // expect only email+password to be passed
    expect(authSpy.register).toHaveBeenCalledOnceWith({
      email: 'x@y.com',
      password: 'secret1',
    });
  });

  it('should not call AuthService.register() if passwords do not match', () => {
    const el: HTMLElement = fixture.nativeElement;

    // simulate mismatch
    const bad = {
      email: 'x@y.com',
      password: 'abc123',
      confirmPassword: 'xyz789',
    };
    // call the page-level onSubmit
    fixture.componentInstance.onSubmit(bad);
    fixture.detectChanges();

    // register should NOT be called
    expect(authSpy.register).not.toHaveBeenCalled();

    // and we should see our mismatch error in the template
    expect(el.textContent).toContain('Passwords do not match');
  });

  it('should show passwordMismatch error under confirmPassword', async () => {
    const dynDE = fixture.debugElement.query(
      By.directive(DynamicFormComponent)
    );
    const dynCmp = dynDE.componentInstance as DynamicFormComponent;

    // simulate submission; form builder will mark all touched
    dynCmp.form.setValue({
      email: 'x@y.com',
      password: '123456', // valid length
      confirmPassword: '654321', // same length but not equal
    });

    dynCmp.form.markAllAsTouched();
    fixture.detectChanges();
    await fixture.whenStable();

    // confirm the mat-error appears
    const msg = fixture.nativeElement.querySelector('mat-error').textContent;
    expect(msg).toContain('Passwords do not match');
  });
});
