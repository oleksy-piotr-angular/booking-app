import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
@Component({
  selector: 'am-inline-errors',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <ng-container *ngIf="control?.errors as errs">
      <mat-error *ngFor="let key of objectKeys(errs)">
        {{ errorMessages[key] || key }}
      </mat-error>
    </ng-container>
  `,
})
export class InlineErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() errorMessages: Record<string, string> = {};
  objectKeys = Object.keys;
}
