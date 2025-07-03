import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineErrorsComponent } from './inline-errors.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InlineErrorsComponent', () => {
  let fixture: ComponentFixture<InlineErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InlineErrorsComponent,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineErrorsComponent);
  });

  it('should render error messages for each control error', () => {
    const control = new FormControl('');
    control.setErrors({
      required: true,
      minlength: { requiredLength: 5, actualLength: 2 },
    });
    control.markAsTouched();

    fixture.componentInstance.control = control;
    fixture.componentInstance.errorMessages = {
      required: 'This field is required',
      minlength: 'Too short',
    };

    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('mat-error');
    expect(errors.length).toBe(2);
    expect(errors[0].textContent).toContain('This field is required');
    expect(errors[1].textContent).toContain('Too short');
  });
});
