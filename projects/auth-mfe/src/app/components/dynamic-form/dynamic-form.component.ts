import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { InlineErrorsComponent } from '../../shared/inline-errors/inline-errors.component';
import { passwordsMatchValidator } from '../../shared/Validators/password-match/passwords-match.validator';

export interface FormFieldConfig {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  validators?: any[];
  // ← new, optional: the name of the field this one must match
  confirmField?: string;
}

@Component({
  selector: 'am-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    InlineErrorsComponent,
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() config: FormFieldConfig[] = [];
  @Input() submitLabel = 'Submit';
  @Input() errorMessages: Record<string, string> = {};

  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && !changes['config'].firstChange) {
      this.buildForm();
    }
  }

  private buildForm() {
    const group: Record<string, any> = {};
    this.config.forEach((f) => {
      group[f.name] = ['', f.validators || []];
    });

    // 1) create the FormGroup
    this.form = this.fb.group(group);

    // 2) attach any cross‐field validators
    this.config.forEach((f) => {
      if (f.confirmField) {
        this.form.addValidators(
          passwordsMatchValidator(f.confirmField, f.name)
        );
      }
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
