import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sm-search-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="search()">
      <input formControlName="query" placeholder="Location" />
      <button type="submit">Search</button>
    </form>
  `,
})
export class SearchFormComponent {
  private router = inject(Router);
  form = inject(FormBuilder).group({ query: [''] });

  search() {
    const q = this.form.value.query;
    // navigate within this MFE
    this.router.navigate(['/search/results'], { queryParams: { q } });
  }
}
