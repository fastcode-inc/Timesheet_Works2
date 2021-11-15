import { Component, OnInit, Inject, ViewChild, EventEmitter } from '@angular/core';
import { IFCDialogConfig } from './ifc-dialog-config';
import { Router } from '@angular/router';
import { Globals } from 'src/app/core/services/globals';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss'],
})
export class PickerComponent implements OnInit {
  onScroll = new EventEmitter();
  onSearch = new EventEmitter();

  loading = false;
  submitted = false;
  title: string;
  items: any[] = [];
  @ViewChild(MatSelectionList, { static: false }) selectionList: MatSelectionList;

  selectedItem: any;
  selectedItems: any[] = [];
  errorMessage = '';
  displayField: string;
  constructor(
    private router: Router,
    private global: Globals,
    public dialogRef: MatDialogRef<PickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFCDialogConfig
  ) {}

  ngOnInit() {
    this.title = this.data.Title;
    this.displayField = this.data.DisplayField;
  }

  onOk() {
    if (!this.data.IsSingleSelection) {
      let selectedOptions = this.selectionList.selectedOptions.selected;
      if (selectedOptions.length > 0) {
        for (let option of selectedOptions) {
          this.selectedItems.push(option.value);
        }
        this.dialogRef.close(this.selectedItems);
      }
    } else {
      this.dialogRef.close(this.selectedItem);
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onTableScroll() {
    this.onScroll.emit();
  }

  onSearchChange(searchValue: string) {
    this.onSearch.emit(searchValue);
  }
}
