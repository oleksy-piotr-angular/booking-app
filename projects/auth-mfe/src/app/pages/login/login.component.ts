import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from '../../components/dynamic-form/dynamic-form.component';
import { AuthService, LoginPayload } from '../../services/auth/auth.service';
import { FormErrorComponent } from '../../components/form-error/form-error.component';

@Component({
  selector: 'am-login-form',
  standalone: true,
  imports: [DynamicFormComponent, FormErrorComponent],
  template: `
    <am-dynamic-form
      [config]="config"
      submitLabel="Login"
      (submitted)="onSubmit($event)"
    >
    </am-dynamic-form>
    <am-form-error [message]="errorMsg"></am-form-error>
  `,
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  public errorMsg: string | null = null;

  public config: FormFieldConfig[] = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
  ];

  public onSubmit(value: LoginPayload): void {
    this.errorMsg = null;
    this.auth.login(value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMsg = err.error?.message || 'Login failed';
      },
    });
  }
}
