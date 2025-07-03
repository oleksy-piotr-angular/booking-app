import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormControlName,
  Validators,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';
import { By } from '@angular/platform-browser';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from './dynamic-form.component';
import { InlineErrorsComponent } from '../../shared/inline-errors/inline-errors.component';

describe('DynamicFormComponent', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;

  const testConfig: FormFieldConfig[] = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'you@x.com',
      validators: [],
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: '••••••••',
      validators: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DynamicFormComponent,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    fixture.componentInstance.config = testConfig;
    fixture.detectChanges();
  });

  it('should render inputs for each config entry', () => {
    const el: HTMLElement = fixture.nativeElement;
    const controls = fixture.debugElement.queryAll(
      By.directive(FormControlName)
    );

    expect(controls.length).toBe(2);

    expect(el.querySelector('input[ng-reflect-name="email"]')).toBeTruthy();
    expect(el.querySelector('input[ng-reflect-name="password"]')).toBeTruthy();
  });

  it('should render a submit button with default label', () => {
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button?.textContent).toContain('Submit');
  });

  it('should render inline errors for invalid and touched controls', () => {
    // One required field
    const config = [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validators: [Validators.required],
      },
    ];
    fixture.componentInstance.config = config;
    fixture.componentInstance.errorMessages = { required: 'Email is required' };
    fixture.detectChanges();

    // Mark the control as touched
    const control = fixture.componentInstance['form'].get('email');
    control?.markAsTouched();
    fixture.detectChanges();

    // Find InlineErrorsComponent
    const errorComponent = fixture.debugElement.query(
      By.directive(InlineErrorsComponent)
    );
    expect(errorComponent).toBeTruthy();

    const errorEl = fixture.nativeElement.querySelector('mat-error');
    expect(errorEl?.textContent).toContain('Email is required');
  });
});
