import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [],
  template: ``,
})
export class FormErrorComponent {
  @Input() message: string | null = null;
}
