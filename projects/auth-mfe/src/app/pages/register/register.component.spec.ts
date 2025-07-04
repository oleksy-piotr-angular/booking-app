import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';

import { RegisterComponent } from './register.component';
import { DynamicFormComponent } from '../../components/dynamic-form/dynamic-form.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
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
});
