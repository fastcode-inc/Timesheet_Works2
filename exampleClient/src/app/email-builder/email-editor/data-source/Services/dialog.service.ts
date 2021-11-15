import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  isMediumDeviceOrLess: boolean;
  dialogRef: MatDialogRef<any>;
  deleteDialogRef: MatDialogRef<ConfirmDialogComponent>;
  mediumDeviceOrLessDialogSize: string = '100%';
  largerDeviceDialogWidthSize: string = '85%';
  largerDeviceDialogHeightSize: string = '85%';

  constructor(public dialog: MatDialog) {}

  addNew(component) {
    this.openDialog(component, null);
    return;
  }

  openDialog(component, data) {
    this.dialogRef = this.dialog.open(component, {
      disableClose: true,
      height: this.isMediumDeviceOrLess ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogHeightSize,
      width: this.isMediumDeviceOrLess ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogWidthSize,
      maxWidth: 'none',
      panelClass: 'datasource-preview-dialog',
      data: data,
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.getItems();
      }
    });
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  confirmDialog(data: any) {
    let tempData = {
      confirmationType: 'confirm',
    };
    data = { ...tempData, ...data };
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: data,
    });
  }
}
