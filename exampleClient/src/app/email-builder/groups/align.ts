import { Component, Input } from '@angular/core';
import { TAlign } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-align',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ 'GROUPS.ALIGN.FIELDS.ALIGN' | translate }}</mat-label>
      <mat-select placeholder="{{ 'GROUPS.ALIGN.FIELDS.ALIGN' | translate }}" [(value)]="model.align" disableRipple>
        <mat-option *ngFor="let position of getPositions()" [value]="position">
          {{ position }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class AlignComponent {
  @Input()
  model: { align: TAlign };
  constructor(private translate: TranslateService) {}

  getPositions(): TAlign[] {
    return ['left', 'center', 'right'];
  }
}
