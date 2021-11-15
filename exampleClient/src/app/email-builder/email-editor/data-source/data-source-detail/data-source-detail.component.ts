import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { EmailVariablTypeService } from '../../../email-editor/email-variable/email-variable.type.service';
import { IDataSource } from '../../../email-editor/data-source/Models/IDataSource';
import { DataSourceService } from '../../../email-editor/data-source/Services/data-source.service';
import { IDataSourceMeta } from '../../../email-editor/data-source/Models/DataSourceMeta';
import { DataSourceTableComponent } from '../data-source-table/data-source-table';
import { DialogService } from '../Services/dialog.service';
import { EmailTemplateService } from '../../email-template.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseDetailsComponent, PickerDialogService } from 'src/app/common/shared';
import { Globals } from 'src/app/core/services/globals';
import { ErrorService } from 'src/app/core/services/error.service';
import { ValidatorsService } from 'src/app/common/shared';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

@Component({
  selector: 'lib-data-source-detail',
  templateUrl: './data-source-detail.component.html',
  styleUrls: ['./data-source-detail.component.scss'],
})
export class DataSourceDetailComponent extends BaseDetailsComponent<IDataSource> implements OnInit {
  emailTemplateId: any;
  readOnlyQuery: boolean;
  metaList: IDataSourceMeta[];

  title: string = this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.TITLE');
  parentUrl: string = './datasource';
  entityName: string = 'DataSource';
  metaData: any;
  dataToPreview: any;
  emailTemplates: any[] = [];
  showSave: boolean = false;

  showMessage: boolean;
  errorMessage: any;
  displayedColumns: string[] = ['columnName', 'dataType'];

  @ViewChild('myEditor', { static: false }) myEditor;

  dataSourceId: number;

  public previewAvailable: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public global: Globals,
    public variableTypedataService: EmailVariablTypeService,
    public pickerDialogService: PickerDialogService,
    public dataService: DataSourceService,
    public errorService: ErrorService,
    public _dialog: DialogService,
    public emailTemplateService: EmailTemplateService,
    public translate: TranslateService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, pickerDialogService, dataService, errorService);
    var u = this.route.parent.toString();
    this.dataService.tableClose$.subscribe((res) => {
      if (res) {
        this.onCancel();
        this.dataService.changetableClose(false);
      }
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setForm();
    this.getItem();
    this.emailTemplateService.getAllTemplates().subscribe((data) => {
      this.emailTemplates = data;
    });
    this.itemForm.get('sqlQuery').valueChanges.subscribe(() => {
      this.previewAvailable = false;
    });
  }

  ngAfterViewInit(): void {
    console.log('after init', this.myEditor);
    //this.getChangeContent();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      emailTemplate: this.formBuilder.group({
        id: ['', Validators.required],
        templateName: [''],
      }),
      sqlQuery: ['', [Validators.required, ValidatorsService.sqlQuery]],
      creation: [''],
      dataSourceMetaList: this.formBuilder.array([]),
      readOnlyQuery: [''],
    });
  }

  selectionChangeDetection() {
    let emailTemplate: FormGroup = this.itemForm.get('emailTemplate') as FormGroup;
    emailTemplate.valueChanges.subscribe((data) => {
      if (data.id && this.emailTemplateId != data.id) {
        let url = `/datasource/getAlreadyMappedDatasourceForEmailTemplate/${data.id}`;
        this.dataService.get(url).subscribe((res) => {
          console.log(res);
          if (res.fields == 'NORECORD') {
          } else {
            let id: FormControl = emailTemplate.get('id') as FormControl;
            id.reset();
            this.errorService.showError(
              this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.ERROS.ALREADY-MAPPED', { fields: res.fields })
            );
          }
        });
      }
    });
  }

  onItemFetched(item: IDataSource) {
    this.item = item;
    this.itemForm.patchValue(this.item);
    this.metaList = this.item.metaList;
    console.log('item is ', this.item);
    this.emailTemplateId = this.item.emailTemplate.id;
    this.selectionChangeDetection();

    this.readOnlyQuery = this.item.readOnlyQuery;

    // this.itemForm.valueChanges.subscribe(()=>{
    // 	this.showSave = true;
    // })
  }

  previewData() {
    let sqlQuery = this.itemForm.controls.sqlQuery.value;
    if (sqlQuery == '') {
      alert(this.translate.instant('EMAIL-EDITOR.DATA-SOURCE.ERRORS.NO-QUERY'));
      return;
    }
    this.dataService.previewData(sqlQuery).subscribe((data) => {
      if (data && data.valid) {
        this.showMessage = false;
        this.errorMessage = '';
        this.previewAvailable = true;
        this._dialog.largerDeviceDialogHeightSize = '70%';
        this._dialog.largerDeviceDialogWidthSize = '50%';
        this._dialog.openDialog(DataSourceTableComponent, data);
        this.metaData = data.metaData;
        this.addControls();
        this.showSave = true;
      } else {
        //alert(data.message);
        this.showMessage = true;
        this.errorMessage = data.message;
      }
    });
  }

  addControls() {
    const arr = this.itemForm.get('dataSourceMetaList') as FormArray;
    arr.clear();
    this.metaData.forEach((element) => {
      let temp = this.formBuilder.group({
        metaColumn: new FormControl(element.metaColumn),
        metaColumnDataType: new FormControl(element.metaColumnDataType),
      });
      arr.push(temp);
    });
  }

  getChangeContent() {
    const editor = this.myEditor.codeMirror;
    const doc = editor.getDoc();
    this.searchKeyword(doc, editor, 'SELECT');
    this.searchKeyword(doc, editor, 'FROM');
    this.searchKeyword(doc, editor, 'WHERE');
  }

  searchKeyword(doc, editor, key) {
    var cursor = doc.getSearchCursor(key, null, `caseFold: false`);
    while (cursor.findNext()) {
      editor.markText(cursor.from(), cursor.to(), { css: 'color: red' });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  openDialog(component, data) {
    this.dialogRef = this.dialog.open(component, {
      disableClose: true,
      height: this.isMediumDeviceOrLess ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogHeightSize,
      width: this.isMediumDeviceOrLess ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogWidthSize,
      maxWidth: 'none',
      panelClass: 'fc-modal-dialog',
      data: data,
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.getItems();
      }
    });
  }
}
