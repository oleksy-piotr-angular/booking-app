import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'am-inline-errors',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `@if (control.errors && (control.dirty || control.touched)) { @for
    (key of objectKeys(control.errors); track key) {
    <mat-error>{{ errorMessages[key] || key }}</mat-error>
    } }`,
})
export class InlineErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() errorMessages: Record<string, string> = {};

  objectKeys(errors: Record<string, any> | null): string[] {
    return errors ? Object.keys(errors) : [];
  }
}
