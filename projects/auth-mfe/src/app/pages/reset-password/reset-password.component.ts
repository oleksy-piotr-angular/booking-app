import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'am-reset-password',
  standalone: true,
  imports: [DynamicFormComponent, FormErrorComponent],
  template: `
    <am-dynamic-form
      [config]="config"
      [errorMessages]="errorMessages"
      submitLabel="Reset Password"
      (submitted)="onSubmit($event)"
    ></am-dynamic-form>
    <am-form-error [message]="message"></am-form-error>
  `,
})
export class ResetPasswordComponent {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly token = this.route.snapshot.paramMap.get('token')!;
  public message: string | null = null;

  // shared config for all “enter new password” flows
  public static readonly passwordFieldsConfig: FormFieldConfig[] = [
    {
      name: 'password',
      type: 'password',
      label: 'New Password',
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

  public config = ResetPasswordComponent.passwordFieldsConfig;

  public errorMessages = {
    required: 'This field is required.',
    minLength: 'Password must be at least 6 characters.',
    passwordMismatch: 'Passwords do not match.',
  };

  public onSubmit(value: any): void {
    const { password, confirmPassword } = value;
    if (password !== confirmPassword) {
      this.message = this.errorMessages.passwordMismatch;
      return;
    }
    this.message = null;
    this.auth.resetPassword(this.token, password).subscribe({
      next: () => (this.message = 'Password has been reset.'),
      error: (err) => (this.message = err.error?.message || 'Reset failed.'),
    });
  }
}
