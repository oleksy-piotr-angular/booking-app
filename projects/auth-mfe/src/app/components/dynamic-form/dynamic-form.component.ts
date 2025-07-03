import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';

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
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  @Input() config: FormFieldConfig[] = [];
  @Input() submitLabel = 'Submit';
  @Output() submitted = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
