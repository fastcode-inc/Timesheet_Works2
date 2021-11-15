import { Component, OnInit, Inject } from '@angular/core';
import { DialogService } from '../Services/dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSourceService } from '../Services/data-source.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'data-source-merge-map',
  templateUrl: './data-source-merge-map.html',
  styleUrls: ['./data-source-merge-map.scss'],
})
export class DataSourceMergeMap implements OnInit {
  dataToPreview: any[];
  displayedColumns: any[] = ['Merge Field', 'Meta List', 'Already Mapped'];
  title: string = this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.MERGE-MAP.TITLE');
  tableSource: any;
  totalMergeField: number = 0;
  mappedMergeField: number = 0;
  len: number = 0;
  emailTemplateId: any;
  constructor(
    public _dialog: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dataService: DataSourceService,
    public snackBar: MatSnackBar,
    public translate: TranslateService
  ) {
    this.emailTemplateId = data.emailTemplateId;
  }

  ngOnInit(): void {
    this.data.data.forEach((element) => {
      let obj = [];
      this.totalMergeField = element.totalMergeField;
      this.mappedMergeField = element.mappedMergeField;
      if (element.alreadyMappedList) {
        if (this.len == 0) {
          this.len = element.alreadyMappedList.length;
        }
        element.alreadyMappedList.forEach((ele) => {
          obj.push(ele.id);
        });
        element.dataSourceMetaList = element.dataSourceMetaList.filter((res) => {
          return !obj.includes(res.id);
        });
      }
    });
  }

  onCancel() {
    this._dialog.onCancel();
  }

  dropDownValueChanged(event, element) {
    let obj = {};
    element.dataSourceMetaList = element.dataSourceMetaList.filter((res) => {
      obj = event.value;
      return res != event.value;
    });
    if (element.alreadyMappedList && element.alreadyMappedList.length > 0) {
      // element.alreadyMappedList.push(obj);
      element.dataSourceMetaList.push(element.alreadyMappedList[0]);
      element.alreadyMappedList[0] = obj;
    } else {
      element.alreadyMappedList = [];
      element.alreadyMappedList.push(obj);
    }
  }

  removeAlreadyAddedMap(event, element) {
    let obj = {};
    element.alreadyMappedList = element.alreadyMappedList.filter((res) => {
      obj = event;
      return res != event;
    });
    element.dataSourceMetaList.push(obj);
  }

  save() {
    let url = '/email/mapping/create';
    let data = this.getDataToSend();
    if (data && data.length > 0) {
      this.dataService.post(url, data).subscribe((res) => {
        var snackBarRef = this.snackBar.open(
          this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.MERGE-MAP.MAPPED-SUCCESSFULLY'),
          null,
          {
            duration: 3000,
            panelClass: ['snackbar-background'],
          }
        );
        this._dialog.onCancel();
      });
    } else {
      if (this.len == 0) {
        alert('No combination exist');
      } else {
        let deletionurl = '/email/deletemapping/' + this.emailTemplateId;
        this.dataService.deleteByUrl(deletionurl).subscribe((res) => {
          var snackBarRef = this.snackBar.open(
            this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.MERGE-MAP.MAPPED-SUCCESSFULLY'),
            null,
            {
              duration: 3000,
              panelClass: ['snackbar-background'],
            }
          );
          this._dialog.onCancel();
        });
      }
    }
  }

  getDataToSend(): any[] {
    let tempArr = [];
    this.data.data.forEach((element) => {
      if (element.alreadyMappedList) {
        element.alreadyMappedList.forEach((ele) => {
          let obj = {};
          obj['emailTemplateId'] = this.data.emailTemplateId;
          obj['mergeFieldId'] = element.mergeField.id;
          obj['dataSourceId'] = ele.dataSourceEntity.id;
          obj['dataSourceMetaId'] = ele.id;
          tempArr.push(obj);
        });
      }
    });
    return tempArr;
  }
}
