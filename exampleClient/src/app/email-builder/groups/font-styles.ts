import { Component, OnInit, Input } from '@angular/core';
import { IpEmailBuilderService } from '../ip-email-builder.service';
import { IFont, TFontStyle, IFontFamily, TFontWeight } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-font-styles',
  template: `
    <div class="group">
      <mat-form-field appearance="outline" *ngIf="font.family">
        <mat-label>{{ 'GROUPS.FONT-STYLES.FIELDS.FAMILY' | translate }}</mat-label>
        <mat-select
          placeholder="{{ 'GROUPS.FONT-STYLES.FIELDS.FAMILY' | translate }}"
          [(value)]="font.family"
          disableRipple
        >
          <mat-option *ngFor="let name of getFontFamiliesNames()" [value]="name">
            {{ name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" *ngIf="font.style">
        <mat-label>{{ 'GROUPS.FONT-STYLES.FIELDS.STYLE' | translate }}</mat-label>
        <mat-select
          placeholder="{{ 'GROUPS.FONT-STYLES.FIELDS.STYLE' | translate }}"
          [(value)]="font.style"
          disableRipple
        >
          <mat-option *ngFor="let style of getFontStyles()" [value]="style">
            {{ style }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    <div class="group">
      <mat-form-field appearance="outline" *ngIf="font.weight">
        <mat-label>{{ 'GROUPS.FONT-STYLES.FIELDS.WEIGHT' | translate }}</mat-label>
        <mat-select
          placeholder="{{ 'GROUPS.FONT-STYLES.FIELDS.WEIGHT' | translate }}"
          [(value)]="font.weight"
          disableRipple
        >
          <mat-option *ngFor="let weight of getCurrentFontWeights()" [value]="weight">
            {{ weight }}
          </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="outline" *ngIf="font.size">
        <mat-label>{{ 'GROUPS.FONT-STYLES.FIELDS.SIZE' | translate }}</mat-label>
        <input
          matInput
          placeholder="{{ 'GROUPS.FONT-STYLES.FIELDS.SIZE' | translate }}"
          type="number"
          max="30"
          min="10"
          step="1"
          [(ngModel)]="font.size"
        />
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class FontStylesComponent {
  @Input()
  font: IFont;

  fontFamilies: IFontFamily;
  constructor(_EBS: IpEmailBuilderService, private translate: TranslateService) {
    this.fontFamilies = _EBS.getFonts();
  }

  getFontStyles(): TFontStyle[] {
    return ['italic', 'normal', 'oblique'];
  }

  getFontFamiliesNames(): string[] {
    return Array.from(this.fontFamilies.keys());
  }

  getCurrentFontWeights(): TFontWeight[] {
    return [
      ...this.fontFamilies.get(this.font.family).match(/\d+/g).map(Number),
      'bold',
      'bolder',
      'inherit',
      // 'initial',
      'light',
      'normal',
    ];
  }
}
