import { Component, Input } from '@angular/core';
import { ILink, TLinkTarget } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-link',
  template: `
    <div class="group f-large">
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.LINK.FIELDS.LINK' | translate }}</mat-label>
        <input matInput [(ngModel)]="link.href" type="url" placeholder="{{ 'GROUPS.LINK.FIELDS.LINK' | translate }}" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'GROUPS.LINK.FIELDS.TARGET' | translate }}</mat-label>
        <mat-select placeholder="{{ 'GROUPS.LINK.FIELDS.TARGET' | translate }}" [(value)]="link.target" disableRipple>
          <mat-option *ngFor="let target of getTargets()" [value]="target">
            {{ getTargetLabel(target) }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
})
export class LinkComponent {
  @Input()
  link: ILink;

  constructor(private translate: TranslateService) {}

  private targetLabels = new Map([
    ['_blank', this.translate.instant('GROUPS.LINK.LABELS.BLANK')],
    ['_self', this.translate.instant('GROUPS.LINK.LABELS.SELF')],
    ['_parent', this.translate.instant('GROUPS.LINK.LABELS.PARENT')],
    ['_top', this.translate.instant('GROUPS.LINK.LABELS.TOP')],
  ]);

  getTargets(): TLinkTarget[] {
    return ['_blank', '_self', '_parent', '_top'];
  }

  getTargetLabel(target) {
    return this.targetLabels.get(target);
  }
}
