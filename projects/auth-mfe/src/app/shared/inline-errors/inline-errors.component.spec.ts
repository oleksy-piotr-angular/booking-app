import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineErrorsComponent } from './inline-errors.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('InlineErrorsComponent', () => {
  let fixture: ComponentFixture<InlineErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineErrorsComponent, MaterialModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(InlineErrorsComponent);
  });

  it('should render each error message for control errors', () => {
    const ctrl = new FormControl('', { nonNullable: true });
    ctrl.setErrors({ required: true, minlength: true });
    fixture.componentInstance.control = ctrl;
    fixture.componentInstance.errorMessages = {
      required: 'Required',
      minlength: 'Too short',
    };
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('mat-error');
    expect(errors.length).toBe(2);
    expect(errors[0].textContent).toContain('Required');
    expect(errors[1].textContent).toContain('Too short');
  });
});
