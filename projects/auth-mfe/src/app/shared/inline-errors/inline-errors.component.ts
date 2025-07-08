import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'am-inline-errors',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: ` <ng-container
    *ngIf="control.errors && (control.dirty || control.touched)"
  >
    <mat-error *ngFor="let key of objectKeys(control.errors)">
      {{ errorMessages[key] || key }}
    </mat-error>
  </ng-container>`,
})
export class InlineErrorsComponent {
  @Input() public control!: AbstractControl;
  @Input() public errorMessages: Record<string, string> = {};

  public objectKeys(errors: Record<string, any> | null): string[] {
    return errors ? Object.keys(errors) : [];
  }
}
