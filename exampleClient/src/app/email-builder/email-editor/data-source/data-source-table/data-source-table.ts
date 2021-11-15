import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../Services/dialog.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'data-source-table',
  templateUrl: './data-source-table.html',
})
export class DataSourceTableComponent implements OnInit {
  dataToPreview: any[];
  displayedColumns: any[];
  displayColumnsType: any[];
  title: string = this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.PREVIEW-TABLE');
  tableSource: any;
  image: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: DialogService,
    public translate: TranslateService
  ) {
    this.displayedColumns = [];
    this.dataToPreview = [];
    if (this.data && Object.keys(this.data).length > 0) {
      this.tableSource = this.data;
      this.displayedColumns = this.tableSource.metaData.map((obj) => obj.metaColumn);

      let singleArray = [];
      let singleColumn = false;
      for (let data of this.tableSource.dataToPreview) {
        if (!Array.isArray(data)) {
          let val = data;
          singleColumn = true;
          data = [];
          data[this.displayedColumns[0]] = val;
          singleArray.push(data);
        } else {
          for (let index in data) {
            data[this.displayedColumns[index]] = data[index];
          }
        }
      }

      if (singleColumn) {
        this.tableSource.dataToPreview = [];
        this.tableSource.dataToPreview = singleArray;
      }
    }
  }

  ngOnInit() {
    // super.ngOnInit()
  }

  onCancel() {
    this._dialog.onCancel();
  }
}
