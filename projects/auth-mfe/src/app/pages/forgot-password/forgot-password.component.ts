import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'am-forgot-password',
  standalone: true,
  imports: [DynamicFormComponent, FormErrorComponent],
  template: `
    <am-dynamic-form
      [config]="config"
      [errorMessages]="errorMessages"
      submitLabel="Send Reset Email"
      (submitted)="onSubmit($event)"
    ></am-dynamic-form>
    <am-form-error [message]="message"></am-form-error>
  `,
})
export class ForgotPasswordComponent {
  public message: string | null = null;

  // extracted so other flows can reuse it
  public static readonly emailOnlyConfig: FormFieldConfig[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      validators: [Validators.required, Validators.email],
    },
  ];

  public config = ForgotPasswordComponent.emailOnlyConfig;

  public errorMessages = {
    required: 'Email is required.',
    email: 'Must be a valid email address.',
  };

  private readonly auth = inject(AuthService);

  public onSubmit(value: { email: string }): void {
    this.message = null;
    this.auth.forgotPassword(value.email).subscribe({
      next: () => (this.message = 'Password reset email sent.'),
      error: (err) =>
        (this.message =
          err.error?.message || 'Something went wrong. Try again.'),
    });
  }
}
