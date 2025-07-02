import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lm-listings',
  standalone: true,
  template: `
    <h2>Results for "{{ query }}"</h2>
    <!-- …render listings here later… -->
  `,
})
export class ListingsComponent {
  private route = inject(ActivatedRoute);
  query = this.route.snapshot.queryParams['q'] || '';
}
