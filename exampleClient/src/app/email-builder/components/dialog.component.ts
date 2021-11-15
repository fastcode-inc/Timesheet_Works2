import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// @dynamic
@Component({
  selector: 'ip-confirm-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.message }}</h2>
    <mat-dialog-actions fxLayout fxLayoutAlign="space-between center" fxLayoutGap="1rem">
      <button mat-stroked-button mat-dialog-close="0">{{ 'COMPONENTS.DIALOG.NO' | translate }}</button>
      <button mat-stroked-button color="warn" mat-dialog-close="1">{{ 'COMPONENTS.DIALOG.YES' | translate }}</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
}
