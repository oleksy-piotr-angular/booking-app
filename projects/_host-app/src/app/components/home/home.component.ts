// home.component.ts
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private snackBar: MatSnackBar = inject(MatSnackBar);

  public openSnackBar(): void {
    this.snackBar.open('Hello from Angular Material!', 'Dismiss', {
      duration: 3000,
    });
  }
}
