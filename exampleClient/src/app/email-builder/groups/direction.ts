import { Component, Input } from '@angular/core';
import { TDirection } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-direction',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ 'GROUPS.DIRECTION.FIELDS.DIRECTION' | translate }}</mat-label>
      <mat-select
        placeholder="{{ 'GROUPS.DIRECTION.FIELDS.DIRECTION' | translate }}"
        [(value)]="model.direction"
        disableRipple
      >
        <mat-option *ngFor="let dir of getDirections()" [value]="dir">
          {{ getDirectionLabel(dir) }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class DirectionComponent {
  @Input()
  model: {
    direction: TDirection;
  };

  constructor(private translate: TranslateService) {}

  private dirLabels: Map<string, string> = new Map([
    ['ltr', this.translate.instant('GROUPS.DIRECTION.LABELS.LTR')],
    ['rtl', this.translate.instant('GROUPS.DIRECTION.LABELS.RTL')],
  ]);

  getDirections(): TDirection[] {
    return ['ltr', 'rtl'];
  }

  getDirectionLabel(dir: TDirection): string {
    return this.dirLabels.get(dir);
  }
}
