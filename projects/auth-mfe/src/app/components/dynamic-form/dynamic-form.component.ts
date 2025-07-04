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

export interface FormFieldConfig {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  validators?: any[];
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
    this.form = this.fb.group(group);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
