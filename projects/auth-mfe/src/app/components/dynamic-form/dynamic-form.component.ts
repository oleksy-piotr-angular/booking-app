import { Component } from '@angular/core';
export interface FormFieldConfig {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  validators: any[];
}
@Component({
  selector: 'am-dynamic-form',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent {
  config!: FormFieldConfig[];
}
