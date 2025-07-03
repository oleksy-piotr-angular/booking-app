import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'am-inline-errors',
  standalone: true,
  imports: [MaterialModule],
  template: `@if (control.errors && (control.dirty || control.touched)) { @for
    (key of objectKeys(control.errors); track key) {
    <mat-error>{{ errorMessages[key] || key }}</mat-error>
    } }`,
})
export class InlineErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() errorMessages: Record<string, string> = {};
  objectKeys = Object.keys;
}
