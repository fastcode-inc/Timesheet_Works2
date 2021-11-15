import { Component, OnInit, Input } from '@angular/core';
import { IWidthHeight } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-width-height',
  template: `
    <div class="group" [ngClass]="{ three: showAutoSlider() }">
      <mat-slide-toggle *ngIf="showAutoSlider()" [checked]="model.auto" (change)="toggleChange($event)">{{
        'GROUPS.WIDTH-HEIGHT.FIELDS.AUTO' | translate
      }}</mat-slide-toggle>
      <mat-form-field appearance="outline">
        <mat-label>{{ label }}</mat-label>
        <input
          matInput
          [(ngModel)]="model.value"
          [disabled]="disableValueField()"
          type="number"
          placeholder="{{ 'GROUPS.WIDTH-HEIGHT.FIELDS.LABEL' | translate }}"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.WIDTH-HEIGHT.FIELDS.UNIT' | translate }}</mat-label>
        <mat-select
          placeholder="{{ 'GROUPS.WIDTH-HEIGHT.FIELDS.UNIT' | translate }}"
          [disabled]="model.auto"
          [(value)]="model.unit"
          disableRipple
        >
          <mat-option *ngFor="let unit of getUnits()" [value]="unit">
            {{ getUnitLabel(unit) }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class WidthHeightComponent implements OnInit {
  @Input()
  model: IWidthHeight;
  @Input()
  label: string;

  private units: Map<string, string> = new Map([
    ['%', this.translate.instant('GROUPS.WIDTH-HEIGHT.UNITS.PERCENTS')],
    ['px', this.translate.instant('GROUPS.WIDTH-HEIGHT.UNITS.PIXELS')],
    ['contain', this.translate.instant('GROUPS.WIDTH-HEIGHT.UNITS.CONTAINS')],
    ['cover', this.translate.instant('GROUPS.WIDTH-HEIGHT.UNITS.COVER')],
  ]);

  constructor(private translate: TranslateService) {}

  toggleChange({ checked }) {
    this.model.auto = checked;
  }

  getUnits() {
    return this.model.units || ['%', 'px'];
  }

  disableValueField() {
    return this.model.auto || ['%', 'px'].indexOf(this.model.unit) === -1;
  }

  showAutoSlider() {
    return this.model.hasOwnProperty('auto');
  }

  getUnitLabel(unit: string): string {
    return this.units.get(unit);
  }

  ngOnInit() {}
}
