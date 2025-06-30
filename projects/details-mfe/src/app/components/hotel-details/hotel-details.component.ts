import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dm-hotel-details',
  standalone: true,
  template: `
    <h2>Hotel ID: {{ hotelId }}</h2>
    <p>…details would go here…</p>
  `,
})
export class HotelDetailsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  hotelId = this.route.snapshot.params['id'];
}
