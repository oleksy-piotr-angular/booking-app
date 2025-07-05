import { Component, Input } from '@angular/core';

@Component({
  selector: 'am-form-error',
  standalone: true,
  template: `
    @if(message){
    <div class="error-message mat-error" role="alert">
      {{ message }}
    </div>
    }
  `,
})
export class FormErrorComponent {
  @Input() message: string | null = null;
  @Input() messages: string[] | null = null;
}
