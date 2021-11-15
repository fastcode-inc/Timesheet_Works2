import { Component, Input } from '@angular/core';
import { IPadding } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-padding',
  template: `
    <div class="group four">
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.PADDING.FIELDS.TOP' | translate }}</mat-label>
        <input
          matInput
          placeholder="{{ 'GROUPS.PADDING.SIZE-PLACEHOLDER' | translate }}"
          type="number"
          min="0"
          step="1"
          [(ngModel)]="padding.top"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.PADDING.FIELDS.RIGHT' | translate }}</mat-label>
        <input
          matInput
          placeholder="{{ 'GROUPS.PADDING.SIZE-PLACEHOLDER' | translate }}"
          type="number"
          min="0"
          step="1"
          [(ngModel)]="padding.right"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.PADDING.FIELDS.BOTTOM' | translate }}</mat-label>
        <input
          matInput
          placeholder="{{ 'GROUPS.PADDING.SIZE-PLACEHOLDER' | translate }}"
          type="number"
          min="0"
          step="1"
          [(ngModel)]="padding.bottom"
        />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.PADDING.FIELDS.LEFT' | translate }}</mat-label>
        <input
          matInput
          placeholder="{{ 'GROUPS.PADDING.SIZE-PLACEHOLDER' | translate }}"
          type="number"
          min="0"
          step="1"
          [(ngModel)]="padding.left"
        />
      </mat-form-field>
    </div>
  `,
  styles: [],
})
export class PaddingComponent {
  @Input()
  padding: IPadding;

  constructor(private translate: TranslateService) {}
}
