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
  @Input() public config: FormFieldConfig[] = [];
  @Input() public submitLabel = 'Submit';
  @Input() public errorMessages: Record<string, string> = {};

  @Output() public submitted = new EventEmitter<any>();

  public form!: FormGroup;

  public constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && !changes['config'].firstChange) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const group: Record<string, any> = {};
    this.config.forEach((f) => {
      group[f.name] = ['', f.validators || []];
    });

    this.form = this.fb.group(group);

    this.config.forEach((f) => {
      if (f.confirmField) {
        this.form.addValidators(
          passwordsMatchValidator(f.confirmField, f.name)
        );
      }
    });
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
