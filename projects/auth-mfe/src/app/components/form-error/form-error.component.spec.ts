import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormErrorComponent } from './form-error.component';

describe('FormErrorComponent (TDD)', () => {
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

  it('renders multiple error messages when messages input is provided', () => {
    fixture.componentInstance.messages = [
      'Invalid email',
      'Password too short',
    ];
    fixture.detectChanges();

    const liElements = fixture.nativeElement.querySelectorAll('li');
    expect(liElements.length).toBe(2);
    expect(liElements[0].textContent).toContain('Invalid email');
    expect(liElements[1].textContent).toContain('Password too short');
  });

  it('deduplicates identical messages before rendering', () => {
    fixture.componentInstance.messages = [
      'Invalid email',
      'Invalid email',
      'Password too short',
    ];
    fixture.detectChanges();

    const liElements = fixture.nativeElement.querySelectorAll('li');
    const texts = Array.from(liElements).map((el) =>
      (el as HTMLElement).textContent?.trim()
    );

    expect(texts).toEqual(['Invalid email', 'Password too short']);
  });
});
