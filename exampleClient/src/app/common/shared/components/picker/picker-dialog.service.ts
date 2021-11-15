import { Injectable } from '@angular/core';
import { Globals } from 'src/app/core/services/globals';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PickerComponent } from '../picker/picker.component';

export interface IFCDialogConfig {
  Title: string;
  IsSingleSelection?: boolean;
  DisplayField: string;
}
@Injectable({
  providedIn: 'root',
})
export class PickerDialogService {
  isSmallDeviceOrLess: boolean;
  dialogRef: MatDialogRef<any>;
  constructor(private global: Globals, public dialog: MatDialog) {}
  open(config: IFCDialogConfig): MatDialogRef<any> {
    this.dialogRef = this.dialog.open(PickerComponent, {
      data: config,
      disableClose: true,
      panelClass: 'picker-modal-dialog',
    });
    return this.dialogRef;
  }
}
