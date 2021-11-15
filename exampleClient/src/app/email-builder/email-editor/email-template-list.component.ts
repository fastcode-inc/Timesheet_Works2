import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmailTemplate } from './iemail-template';
import { EmailTemplateService } from './email-template.service';

import { Router, ActivatedRoute } from '@angular/router';
import {
  BaseListComponent,
  IListColumn,
  ListColumnType,
  PickerDialogService,
  ConfirmDialogComponent,
  ServiceUtils,
} from 'src/app/common/shared';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from './data-source/Services/dialog.service';
import { DataSourceMergeMap } from './data-source/data-source-merge-map/data-source-merge-map';
import { Globals } from 'src/app/core/services/globals';
import { ErrorService } from 'src/app/core/services/error.service';
import { MatSort } from '@angular/material/sort';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'app-emailtemplate-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss'],
})
export class EmailTemplateListComponent extends BaseListComponent<IEmailTemplate> implements OnInit {
  title: string = this.translate.instant('EMAIL-EDITOR.EMAIL-TEMPLATE.TITLE');
  entityName: string = 'Email';
  columns: IListColumn[] = [
    {
      column: 'templatename',
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-TEMPLATE.FIELDS.TEMPLATE-NAME'),
      sort: true,
      filter: true,
      type: ListColumnType.String,
    },
    {
      column: 'subject',
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-TEMPLATE.FIELDS.SUBJECT'),
      sort: true,
      filter: true,
      type: ListColumnType.String,
    },
    {
      column: 'category',
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-TEMPLATE.FIELDS.CATEGORY'),
      sort: true,
      filter: true,
      type: ListColumnType.String,
    },
    {
      column: 'actions',
      label: this.translate.instant('EMAIL-GENERAL.ACTIONS.ACTIONS'),
      sort: false,
      filter: false,
      type: ListColumnType.String,
    },
  ];

  selectedColumns = this.columns;
  displayedColumns: string[] = this.columns.map((obj) => {
    return obj.column;
  });

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public global: Globals,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public emailService: EmailTemplateService,
    public errorService: ErrorService,
    private translate: TranslateService,
    public _dialog: DialogService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(router, route, dialog, global, changeDetectorRefs, pickerDialogService, emailService, errorService);
  }

  ngOnInit() {
    this.setAssociation();
    this.primaryKeys = ['id'];
    super.ngOnInit();
  }

  initializePageInfo() {
    this.hasMoreRecords = true;
    this.pageSize = 10;
    this.lastProcessedOffset = -1;
    this.currentPage = 0;
  }

  setAssociation() {
    this.associations = [];
  }

  addNew() {
    this.router.navigate(['./emailtemplateeditor'], { relativeTo: this.route.parent });
    return;
  }

  getDataSourceMap(item) {
    let obj = {};
    obj['emailTemplateId'] = item.id;
    let url = `/email/mapping/${item.id}`;
    this.dataService.get(url).subscribe((res) => {
      obj['data'] = res;
      this._dialog.openDialog(DataSourceMergeMap, obj);
    });
  }

  onCancel(): void {
    this._dialog.onCancel();
  }

  deleteData(item) {
    let url = `/datasource/getAllMappedForEmailTemplate/${item.id}`;
    this.dataService.get(url).subscribe((res) => {
      console.log(res);
      if (res.fields == 'NORECORD') {
        this.delete(item);
      } else {
        let data = {
          message: this.translate.instant('EMAIL-EDITOR.ERRORS.TEMPLATE-MAPPED'),
        };
        this.delete(item, data);
      }
    });
  }

  /**
   * Prompts user to confirm delete action.
   * @param item Item to be deleted.
   */
  delete(item: IEmailTemplate, tempData?: Object): void {
    let data = {
      confirmationType: 'delete',
    };
    if (tempData) {
      data = { ...data, ...tempData };
    }
    console.log(data);
    this.deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: data,
    });

    this.deleteDialogRef.afterClosed().subscribe((action) => {
      if (action) {
        this.deleteItem(item);
      }
    });
  }

  /**
   * Calls service method to delete item.
   * @param item Item to be deleted.
   */
  deleteItem(item: IEmailTemplate) {
    let id = ServiceUtils.encodeIdByObject(item, this.primaryKeys);
    this.dataService.delete(id).subscribe(
      (result) => {
        if (result) {
          alert(this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.ERRORS.DELETE'));
        } else {
          let r = result;
          const index: number = this.items.findIndex((x) => ServiceUtils.encodeIdByObject(x, this.primaryKeys) == id);
          if (index !== -1) {
            this.items.splice(index, 1);
            this.items = [...this.items];
            this.changeDetectorRefs.detectChanges();
          }
        }
      },
      (error) => {}
    );
  }
}
