import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControlName } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../shared/material.module';
import { By } from '@angular/platform-browser';
import {
  DynamicFormComponent,
  FormFieldConfig,
} from './dynamic-form.component';

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
});
