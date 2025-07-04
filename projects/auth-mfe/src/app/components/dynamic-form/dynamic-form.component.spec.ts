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

describe('DynamicFormComponent (integration)', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;

  const twoFields: FormFieldConfig[] = [
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
        InlineErrorsComponent, // ← real component
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    fixture.componentInstance.config = twoFields;
    fixture.detectChanges();
  });

  it('renders inputs for each config entry', () => {
    const els = fixture.debugElement.queryAll(By.directive(FormControlName));
    expect(els.length).toBe(2);
  });

  it('renders a default submit button', () => {
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.textContent).toContain('Submit');
  });

  it('passes the right control and messages into InlineErrorsComponent', async () => {
    // re-create component with a single required field
    const oneField: FormFieldConfig[] = [
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validators: [Validators.required],
      },
    ];
    fixture.componentInstance.config = oneField;
    fixture.componentInstance.errorMessages = { required: 'Email is required' };
    fixture.detectChanges();
    await fixture.whenStable();

    // mark invalid & touched
    const ctrl = fixture.componentInstance.form.get('email')!;
    ctrl.setValue('');
    ctrl.markAsTouched();
    ctrl.updateValueAndValidity();
    fixture.detectChanges();
    await fixture.whenStable();

    // find the InlineErrorsComponent
    const inlineDE = fixture.debugElement.query(
      By.directive(InlineErrorsComponent)
    );
    expect(inlineDE).toBeTruthy();

    const inlineCmp = inlineDE.componentInstance as InlineErrorsComponent;
    // verify it received the correct control & messages
    expect(inlineCmp.control).toBe(ctrl);
    expect(inlineCmp.errorMessages).toEqual({ required: 'Email is required' });
  });
});
