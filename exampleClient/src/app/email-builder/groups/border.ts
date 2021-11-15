import { Component, Input } from '@angular/core';
import { IBorder } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-border',
  template: `
    <div class="group" [ngClass]="{ three: !isEven() }">
      <mat-form-field appearance="outline" *ngIf="hasOwnProperty('width')">
        <mat-label>{{ 'GROUPS.BORDER.FIELDS.BORDER-WIDTH' | translate }}</mat-label>
        <input
          matInput
          [(ngModel)]="border.width"
          type="number"
          min="0"
          step="1"
          placeholder="{{ 'GROUPS.BORDER.FIELDS.BORDER-WIDTH' | translate }}"
        />
      </mat-form-field>
      <mat-form-field appearance="outline" *ngIf="hasOwnProperty('style')">
        <mat-label>{{ 'GROUPS.BORDER.FIELDS.STYLE' | translate }}</mat-label>
        <mat-select placeholder="{{ 'GROUPS.BORDER.FIELDS.STYLE' | translate }}" [(value)]="border.style" disableRipple>
          <mat-option *ngFor="let style of styles" [value]="style.value">
            {{ style.label }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <ip-color [model]="border" *ngIf="hasOwnProperty('color')"></ip-color>
      <mat-form-field appearance="outline" *ngIf="hasOwnProperty('radius')">
        <mat-label>{{ 'GROUPS.BORDER.FIELDS.RADIUS' | translate }}</mat-label>
        <input
          matInput
          [(ngModel)]="border.radius"
          type="number"
          min="0"
          step="1"
          placeholder="{{ 'GROUPS.BORDER.FIELDS.RADIUS' | translate }}"
        />
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class BorderComponent {
  @Input()
  border: IBorder;

  styles: any[] = [
    {
      label: 'solid',
      value: 'solid',
    },
    {
      label: 'dotted',
      value: 'dotted',
    },
    {
      label: 'dashed',
      value: 'dashed',
    },
  ];

  constructor(private translate: TranslateService) {}

  isEven(): boolean {
    return Object.keys(this.border).length % 2 === 0;
  }

  hasOwnProperty(property: string): boolean {
    return this.border.hasOwnProperty(property);
  }
}
