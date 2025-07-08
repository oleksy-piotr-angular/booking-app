// register.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { AuthService, RegisterPayload } from '../../services/auth/auth.service';
import { FormErrorComponent } from '../../components/form-error/form-error.component';

@Component({
  selector: 'am-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicFormComponent,
    FormErrorComponent,
  ],
  template: `
    <am-dynamic-form
      [config]="config"
      [errorMessages]="errorMessages"
      submitLabel="Register"
      (submitted)="onSubmit($event)"
    ></am-dynamic-form>

    <am-form-error [message]="errorMsg"></am-form-error>
  `,
})
export class RegisterComponent {
  public config: FormFieldConfig[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validators: [Validators.required, Validators.minLength(6)],
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
      validators: [Validators.required],
      confirmField: 'password',
    },
  ];

  public mismatchError = false;
  public errorMsg: string | null = null;

  public errorMessages = {
    required: 'This field is required.',
    passwordMismatch: 'Passwords do not match. Please try again.',
  };

  private readonly auth = inject(AuthService);

  public onSubmit(value: any): void {
    const { password, confirmPassword, ...rest } = value;

    if (password !== confirmPassword) {
      this.mismatchError = true;
      this.errorMsg = 'Passwords do not match. Please try again.';
      return;
    }

    this.mismatchError = false;
    this.errorMsg = null;

    const payload: RegisterPayload = { password, ...rest };

    this.auth.register(payload).subscribe({
      next: () => {
        // success logic here (redirect, toast, reset, etc.)
      },
      error: (err) => {
        this.errorMsg =
          err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
