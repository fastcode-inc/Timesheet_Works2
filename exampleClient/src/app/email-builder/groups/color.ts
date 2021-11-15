import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-color',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input matInput [(ngModel)]="model[key]" type="color" />
    </mat-form-field>
  `,
})
export class ColorComponent {
  @Input()
  model: object;
  @Input()
  key = 'color';
  @Input()
  label = this.translate.instant('GROUPS.COLOR.FIELDS.COLOR');
  constructor(private translate: TranslateService) {}
}
