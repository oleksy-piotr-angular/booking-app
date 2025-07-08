// register.component.ts
import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { AuthService, RegisterPayload } from '../../services/auth/auth.service';
import { FormErrorComponent } from '../../components/form-error/form-error.component';

@Component({
  selector: 'am-register-form',
  standalone: true,
  imports: [DynamicFormComponent, FormErrorComponent],
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
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public errorMsg: string | null = null;

  public config: FormFieldConfig[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      validators: [Validators.required],
    },
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

  public errorMessages = {
    required: 'This field is required.',
    email: 'Please enter a valid email address.',
    minlength: 'Password must be at least 6 characters.',
    passwordMismatch: 'Passwords do not match.',
  };

  public onSubmit(value: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): void {
    this.errorMsg = null;

    if (value.password !== value.confirmPassword) {
      this.errorMsg = this.errorMessages['passwordMismatch'];
      return;
    }

    const { confirmPassword, ...payload } = value;
    this.auth.register(payload).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.errorMsg =
          err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
