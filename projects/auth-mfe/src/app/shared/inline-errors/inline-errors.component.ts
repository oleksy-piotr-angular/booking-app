import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'am-inline-errors',
  standalone: true,
  imports: [],
  templateUrl: './inline-errors.component.html',
  styleUrl: './inline-errors.component.scss',
})
export class InlineErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() errorMessages: Record<string, string> = {};
}
