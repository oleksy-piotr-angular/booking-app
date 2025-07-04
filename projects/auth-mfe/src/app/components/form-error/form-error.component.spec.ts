import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormErrorComponent } from './form-error.component';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('renders nothing when message is null', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.error-message'))).toBeNull();
  });

  it('renders the provided error message', () => {
    fixture.componentInstance.message = 'Server failure';
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.error-message'))
      ?.nativeElement as HTMLElement;
    expect(el.textContent).toContain('Server failure');
  });
});
