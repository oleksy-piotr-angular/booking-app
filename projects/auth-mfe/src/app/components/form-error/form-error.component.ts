import { Component, Input } from '@angular/core';

@Component({
  selector: 'am-form-error',
  standalone: true,
  styles: [
    `
      .error-message {
        margin-top: 1rem;
        padding: 1rem;
        background-color: #fdecea;
        color: #b71c1c;
        border-left: 4px solid #f44336;
        border-radius: 4px;
      }

      ul {
        padding-left: 1.2rem;
        margin: 0;
      }

      li {
        margin: 0.25rem 0;
      }
    `,
  ],
  template: `
    @if (dedupedMessages.length) {
    <div class="error-message mat-error" role="alert">
      <ul>
        @for (msg of dedupedMessages; track msg) {
        <li>{{ msg }}</li>
        }
      </ul>
    </div>
    } @else if (message) {
    <div class="error-message mat-error" role="alert">
      {{ message }}
    </div>
    }
  `,
})
export class FormErrorComponent {
  @Input() public message: string | null = null;
  @Input() public messages: string[] | null = null;

  public get dedupedMessages(): string[] {
    return Array.from(new Set(this.messages ?? []));
  }
}
