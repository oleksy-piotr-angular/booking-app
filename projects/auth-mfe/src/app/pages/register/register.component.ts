import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { AuthService, RegisterPayload } from '../../services/auth/auth.service';

@Component({
  selector: 'am-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    DynamicFormComponent,
  ],
  template: `
    <am-dynamic-form
      [config]="config"
      [errorMessages]="errorMessages"
      submitLabel="Register"
      (submitted)="onSubmit($event)"
    ></am-dynamic-form>
    <mat-error *ngIf="mismatchError">
      Passwords do not match. Please try again.
    </mat-error>
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
      confirmField: 'password', // ← tell dynamic‐form to match these two
    },
  ];

  public mismatchError = false;
  public errorMessages = {
    required: 'This field is required.',
    passwordMismatch: 'Passwords do not match. Please try again.',
  };

  constructor(private auth: AuthService) {}

  public onSubmit(value: any): void {
    const { password, confirmPassword, ...rest } = value as any;

    // 1) guard mismatch
    if (password !== confirmPassword) {
      this.mismatchError = true;
      return;
    }

    // 2) clear any prior error
    this.mismatchError = false;

    // 3) call the API
    const payload = { password, ...rest };
    this.auth.register(payload).subscribe();
  }
}
