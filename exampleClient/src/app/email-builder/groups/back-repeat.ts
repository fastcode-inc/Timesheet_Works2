import { Component, Input } from '@angular/core';
import { TBackgroundRepeat } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-back-repeat',
  template: `
    <mat-form-field appearance="outline">
      <mat-label>{{ 'GROUPS.BACK-REPEAT.LABEL' | translate }}</mat-label>
      <mat-select placeholder="GROUPS.BACK-REPEAT.FIELDS.LABEL" [(value)]="model.repeat" disableRipple>
        <mat-option *ngFor="let repeat of getRepeats()" [value]="repeat">
          {{ getRepeatLabel(repeat) }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class BackRepatComponent {
  @Input()
  model: { repeat: TBackgroundRepeat };

  private repeatLabels: Map<string, string> = new Map([
    ['no-repeat', this.translate.instant('GROUPS.BACK-REPEAT.LABELS.NO-REPEAT')],
    ['repeat', this.translate.instant('GROUPS.BACK-REPEAT.LABELS.REPEAT')],
    ['repeat-x', this.translate.instant('GROUPS.BACK-REPEAT.LABELS.REPEAT-X')],
    ['repeat-y', this.translate.instant('GROUPS.BACK-REPEAT.LABELS.REPEAT-Y')],
    ['round', this.translate.instant('GROUPS.BACK-REPEAT.LABELS.ROUND')],
    ['space', this.translate.instant('GROUPS.BACK-REPEAT.LABELS.SPACE')],
  ]);

  constructor(private translate: TranslateService) {}

  getRepeats(): TBackgroundRepeat[] {
    return ['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'round', 'space'];
  }

  getRepeatLabel(repeat: TBackgroundRepeat): string {
    return this.repeatLabels.get(repeat);
  }
}
