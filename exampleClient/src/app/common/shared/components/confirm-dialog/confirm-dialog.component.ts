import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public translate: TranslateService
  ) {}

  public confirmMessage: string;
  public title: string;
  public action: string;

  ngOnInit() {
    this.setData();
  }

  /**
   * sets dialog title, message and
   * action texts.
   */
  setData() {
    if (this.data.confirmationType == 'delete') {
      this.confirmMessage = this.translate.instant('CONFIRM-DIALOG.DELETE.MESSAGE');
      this.title = this.translate.instant('CONFIRM-DIALOG.DELETE.TITLE');
      this.action = this.translate.instant('GENERAL.ACTIONS.DELETE');
    } else {
      this.confirmMessage = this.data.message ? this.data.message : this.translate.instant('CONFIRM-DIALOG.MESSAGE');
      this.title = this.data.title ? this.data.title : this.translate.instant('CONFIRM-DIALOG.TITLE');
      this.action = this.data.action ? this.data.action : this.translate.instant('GENERAL.ACTIONS.CONFIRM');
    }
  }
}
