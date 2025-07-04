import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { AuthService, RegisterPayload } from '../../services/auth.service';

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
      submitLabel="Register"
      (submitted)="onSubmit($event)"
    ></am-dynamic-form>
  `,
})
export class RegisterComponent {
  config: FormFieldConfig[] = [
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
    },
  ];

  constructor(private auth: AuthService) {}

  onSubmit(value: any) {
    // strip out confirmPassword
    const { confirmPassword, ...payload } = value as RegisterPayload & {
      confirmPassword: string;
    };
    this.auth.register(payload).subscribe();
  }
}
