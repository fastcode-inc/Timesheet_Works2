import { Component, Input } from '@angular/core';
import { ILineHeight, TLineHeight } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-line-height',
  template: `
    <div class="group">
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.LINE-HEIGHT.FIELDS.LINE-HEIGHT' | translate }}</mat-label>
        <input
          matInput
          [(ngModel)]="lineHeight.value"
          type="number"
          step="1"
          placeholder="{{ 'GROUPS.LINE-HEIGHT.FIELDS.LINE-HEIGHT' | translate }}"
          [disabled]="lineHeight.unit === 'none'"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.LINE-HEIGHT.FIELDS.UNIT' | translate }}</mat-label>
        <mat-select
          placeholder="{{ 'GROUPS.LINE-HEIGHT.FIELDS.UNIT' | translate }}"
          [(value)]="lineHeight.unit"
          disableRipple
        >
          <mat-option *ngFor="let unit of getLineHeights()" [value]="unit">
            {{ getUnitLabel(unit) }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class LineHeightComponent {
  @Input()
  lineHeight: ILineHeight;

  constructor(private translate: TranslateService) {}

  private units: Map<string, string> = new Map([
    ['%', this.translate.instant('GROUPS.LINE-HEIGHT.UNITS.PERCENTS')],
    ['px', this.translate.instant('GROUPS.LINE-HEIGHT.UNITS.PIXELS')],
    ['none', this.translate.instant('GROUPS.LINE-HEIGHT.UNITS.NONE')],
  ]);

  getLineHeights(): TLineHeight[] {
    return ['%', 'px', 'none'];
  }

  getUnitLabel(unit: TLineHeight): string {
    return this.units.get(unit);
  }
}
