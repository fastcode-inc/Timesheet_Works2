import { Component, OnInit, Inject } from '@angular/core';
import { EmailVariableService } from './email-variable.service';
import { IEmailVariable } from './iemail-variable';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseNewComponent, PickerDialogService, ValidatorsService } from 'src/app/common/shared'; // 'fastCodeCore';
import { IEmailVariableType } from './iemail-variable-type';
import { EmailVariablTypeService } from './email-variable.type.service';
import { PropertyType } from '../../email-editor/email-variable/property-type';

import { formatDate, DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';
import { EmailFileService } from '../email-file.service';
import { TranslateService } from '@ngx-translate/core';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Globals } from 'src/app/core/services/globals';
import { ErrorService } from 'src/app/core/services/error.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

class PickDateAdapter extends NativeDateAdapter {
  static selectedDropDownValue: any;
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, PickDateAdapter.selectedDropDownValue, this.locale);
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-email-variable-new',
  templateUrl: './email-variable-new.component.html',
  styleUrls: ['./email-variable-new.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS },
    [DatePipe],
  ],
})
export class EmailVariableNewComponent extends BaseNewComponent<IEmailVariable> implements OnInit {
  showImageDropDown: boolean;
  showListButtonAndText: boolean;
  showImage: boolean;
  showPhone: boolean;
  showDecimalDropDown: boolean;
  showDatePicker: boolean;
  showDropDown: boolean;
  showInput: boolean = true;
  showTextArea: boolean;
  showLink: boolean;
  dropDownLabel: string = '';

  imageSrc: string;
  placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.DEFAULT-VALUE-PLACEHOLDER');

  dropdownValues: any[] = [];
  imageDropDown: any[] = [
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.IMAGE-DROPDOWN.HORIZONTAL'),
      value: 'Horizontal',
    },
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.IMAGE-DROPDOWN.VERTICAL'),
      value: 'Verticle',
    },
  ];
  numberTypes: any[] = [
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.NUMBER.INTEGER'),
      value: 'Integer',
    },
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.NUMBER.DECIMAL'),
      value: 'Decimal',
    },
  ];
  listType: any[] = [
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.LIST.COMMA-SEPARATED'),
      value: 'Comma Seperated',
    },
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.LIST.BULLET-VERTICAL'),
      value: 'Bullet Verticle List',
    },
    {
      label: this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.TYPES.LIST.NUMBERED-VERTICAL'),
      value: 'Numbered Vertical List',
    },
  ];
  decimalDropDown: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  title: string = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.ADD-TITLE');
  entityName: string = 'EmailVariable';
  emailVariableType: IEmailVariableType[];

  selectedVariableType: any;
  selectedDropDownValue: any;
  listData: string[] = [];
  fileIds: number[] = [];
  attatchment: {
    myFile?: File;
    url?: any;
  }[] = [];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmailVariableNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public global: Globals,
    public pickerDialogService: PickerDialogService,
    public dataService: EmailVariableService,
    public variableTypedataService: EmailVariablTypeService,
    public errorService: ErrorService,
    public datePipe: DatePipe,
    public emailFileService: EmailFileService,
    public translate: TranslateService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(
      formBuilder,
      router,
      route,
      dialog,
      dialogRef,
      //   data,
      global,
      pickerDialogService,
      dataService,
      errorService
    );
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      propertyName: ['', [Validators.required, ValidatorsService.alphanumericSpecialCharacterValidate]],
      propertyType: ['', Validators.required],
      defaultValue: ['', Validators.required],
      mergeType: [''],
    });
    super.ngOnInit();
    this.checkPassedData();
    this.variableTypedataService.getAll().subscribe((data) => {
      this.emailVariableType = data;
    });

    this.IsUpdatePermission = true;
  }

  addOrRemoveValidation(fieldName, validations, addOrRemove) {
    if (addOrRemove) {
      this.itemForm.controls[fieldName].setValidators(validations);
    } else {
      this.itemForm.controls[fieldName].setValidators(null);
    }
  }
  // convenience getter for easy access to form fields
  getSelectedVariableType(event) {
    this.itemForm.controls.defaultValue.setValue('');
    this.itemForm.controls.mergeType.setValue('');
    this.selectedVariableType = event.value;
    //remove previous validation if any previous
    this.addOrRemoveValidation('defaultValue', [], false);
    this.addOrRemoveValidation('mergeType', [], false);

    switch (this.selectedVariableType) {
      case PropertyType.TEXT:
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.DEFAULT-VALUE-PLACEHOLDER');
        this.addOrRemoveValidation('defaultValue', [Validators.required, Validators.maxLength(256)], true);
        this.showHideSeperateFields(true, false, false, false, false, false, false, false, false, false);
        break;
      case PropertyType.PERCENTAGE:
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.DEFAULT-VALUE-PLACEHOLDER');
        this.addOrRemoveValidation('defaultValue', [Validators.required, ValidatorsService.percentageValidation], true);
        this.showHideSeperateFields(true, false, false, false, false, false, false, false, false, false);
        break;
      case PropertyType.EMAIL:
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.DEFAULT-VALUE-PLACEHOLDER');
        this.addOrRemoveValidation('defaultValue', [Validators.required, ValidatorsService.emailValidation], true);
        this.showHideSeperateFields(true, false, false, false, false, false, false, false, false, false);
        break;
      case PropertyType.HYPERLINK:
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.LINK.PLACEHOLDER');
        this.addOrRemoveValidation('defaultValue', [Validators.required, ValidatorsService.websiteValidate], true);
        this.showHideSeperateFields(true, false, false, false, false, false, false, false, false, false);
        break;
      case PropertyType.MULTILINE:
        this.addOrRemoveValidation('defaultValue', [Validators.required, Validators.maxLength(512)], true);
        this.showHideSeperateFields(false, true, false, false, false, false, false, false, false, false);
        break;
      case PropertyType.DATE:
        this.addOrRemoveValidation('defaultValue', [Validators.required], true);
        this.showHideSeperateFields(false, false, true, false, false, false, false, false, false, false);
        this.dropDownLabel = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.DATE.LABEL');
        this.getDropDownValue();
        break;
      case PropertyType.CURRENCY:
        this.showHideSeperateFields(false, false, true, false, false, false, false, false, false, false);
        this.dropDownLabel = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.CURRENCY.LABEL');
        this.addOrRemoveValidation('defaultValue', [ValidatorsService.decimalPrecisionTwo], true);
        this.getDropDownValue();
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.CURRENCY.PLACEHOLDER');
        break;
      case PropertyType.NUMBER:
        this.showHideSeperateFields(true, false, true, false, false, false, false, false, false, false);
        this.dropDownLabel = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.NUMBER.LABEL');
        this.getDropDownValue();
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.DEFAULT-VALUE-PLACEHOLDER');
        this.addOrRemoveValidation('defaultValue', [ValidatorsService.integer], true);
        break;
      case PropertyType.PHONE:
        this.showHideSeperateFields(false, false, false, false, false, true, false, false, false, false);
        break;
      case PropertyType.IMAGE:
        this.showHideSeperateFields(false, false, false, false, false, false, true, false, false, false);
        break;
      case PropertyType.LIST:
        this.showHideSeperateFields(true, false, true, false, false, false, false, true, false, false);
        this.dropDownLabel = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.STORAGE.LABEL');
        this.getDropDownValue();
        this.addOrRemoveValidation('defaultValue', [Validators.required], true);
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.DEFAULT-VALUE-PLACEHOLDER');
        break;
      case PropertyType.CLICKABLE_IMAGE:
        this.placeHolderValue = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.LINK.PLACEHOLDER');
        this.addOrRemoveValidation('mergeType', [ValidatorsService.websiteValidate], true);
        this.showHideSeperateFields(false, false, false, false, false, false, true, false, true, false);
        break;
      case PropertyType.LIST_OF_IMAGES:
        this.showHideSeperateFields(false, false, true, false, false, false, true, false, false, true);
        this.getDropDownValue();
        this.dropDownLabel = this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.MERGE-VALUE.POSITION.LABEL');
        break;
      default:
      //"something else"
    }
  }

  getDropDownValue() {
    switch (this.selectedVariableType) {
      case PropertyType.DATE:
      case PropertyType.CURRENCY:
        this.variableTypedataService.getAllMasterValue(this.selectedVariableType).subscribe((data) => {
          this.dropdownValues = data.map((str) => ({ value: str, label: str }));
        });
        break;
      case PropertyType.NUMBER:
        this.dropdownValues = this.numberTypes;
        break;
      case PropertyType.LIST:
        this.dropdownValues = this.listType;
        break;
      case PropertyType.LIST_OF_IMAGES:
        this.dropdownValues = this.imageDropDown;
        break;
    }
  }

  dropDownValueChanged(event) {
    this.selectedDropDownValue = event.value;
    this.itemForm.controls.defaultValue.setValue('');
    switch (this.selectedVariableType) {
      case PropertyType.DATE:
        this.showDatePicker = true;
        this.showDecimalDropDown = false;
        PickDateAdapter.selectedDropDownValue = event.value;
        break;
      case PropertyType.CURRENCY:
        this.showInput = true;
        break;
      case PropertyType.NUMBER:
        this.addOrRemoveValidation('defaultValue', [], false);

        if (this.selectedDropDownValue == 'Decimal') {
          //	this.showDecimalDropDown = true;
          this.addOrRemoveValidation('defaultValue', [Validators.required, ValidatorsService.decimalPrecision], true);
        } else {
          //	this.showDecimalDropDown = false;
          this.addOrRemoveValidation('defaultValue', [Validators.required, ValidatorsService.integer], true);
        }
        break;
      case PropertyType.LIST_OF_IMAGES:
        break;
    }
  }

  showHideSeperateFields(
    showInut,
    showTextArea,
    showDropDown,
    showDecimalDropDown,
    showDatePicker,
    showPhone,
    showImage,
    showListButtonAndText,
    showLink,
    showImageDropDown
  ) {
    this.showInput = showInut;
    this.showTextArea = showTextArea;
    this.showDropDown = showDropDown;
    this.showDecimalDropDown = showDecimalDropDown;
    this.showDatePicker = showDatePicker;
    this.showPhone = showPhone;
    this.showImage = showImage;
    this.showListButtonAndText = showListButtonAndText;
    this.showLink = showLink;
    this.showImageDropDown = showImageDropDown;
  }

  decimalDropDownChange(event) {
    let decimalPoints = event.value;
    ValidatorsService.digit = decimalPoints;
    this.addOrRemoveValidation('defaultValue', [ValidatorsService.decimalPrecision], true);
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      if (this.selectedVariableType == PropertyType.IMAGE) {
        this.attatchment = [];
        // this.myFiles = [];
        // this.urlArray=[];
      }
      if (
        event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg'
      ) {
        if (event.target.files[0].size < 50000000) {
          let obj = {};
          const file = event.target.files[0];
          obj['myFile'] = event.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file); // read file as data url

          reader.onload = (event) => {
            // called once readAsDataURL is completed
            obj['url'] = reader.result;
            // this.urlArray.push(reader.result);
          };
          this.attatchment.push(obj);
        } else {
          this.itemForm.controls.defaultValue.setValue('');
          alert(this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.ERRORS.FILE-SIZE-EXCEEDING'));
          if (this.selectedVariableType == PropertyType.IMAGE) {
            this.attatchment = [];
          }
        }
      } else {
        this.itemForm.controls.defaultValue.setValue('');
        alert(this.translate.instant('EMAIL-EDITOR.EMAIL-VARIABLE.ERRORS.NO-IMAGE'));
        if (this.selectedVariableType == PropertyType.IMAGE) {
          this.attatchment = [];
        }
      }
    }
  }

  onSubmit() {
    // stop here if form is invalid
    let check = true;
    //doing so for images
    if (this.itemForm.invalid) {
      return;
    }

    this.submitted = true;
    this.loading = true;
    switch (this.selectedVariableType) {
      case PropertyType.DATE:
        this.itemForm.controls.defaultValue.setValue(
          this.datePipe.transform(this.itemForm.controls.defaultValue.value, this.selectedDropDownValue)
        );
        break;
      case PropertyType.LIST:
        if (this.listData && this.listData.length > 0) {
          this.itemForm.controls.defaultValue.setValue(this.listData.join(','));
        }
        break;
      case PropertyType.IMAGE:
      case PropertyType.CLICKABLE_IMAGE:
      case PropertyType.LIST_OF_IMAGES:
        check = false;
        this.saveAttachments();
        //need to check this code
        break;
    }
    if (check) {
      this.dataService
        .create(this.itemForm.getRawValue())
        .pipe(first())
        .subscribe(
          (data) => {
            this.dialogRef.close(data);
          },
          (error) => {
            this.errorService.showError(this.translate.instant('EMAIL-GENERAL.ERRORS.CREATE-FAILED'));
            this.loading = false;
            this.dialogRef.close(null);
          }
        );
    }
  }

  addNewItem() {
    this.listData.push(this.itemForm.controls.defaultValue.value);
  }

  removeListItem(index) {
    this.listData.splice(index, 1);
  }

  removeImage(index) {
    this.attatchment.splice(index, 1);
  }

  saveAttachments() {
    if (this.attatchment && this.attatchment.length > 0) {
      this.attatchment.forEach((data) => {
        if (data.myFile.name) {
          const fileMetadata = {
            name: data.myFile.name,
            summary: data.myFile.name,
          };
          this.emailFileService.createFileMetadata(fileMetadata).subscribe((res) => {
            this.emailFileService.uploadFile(res.id, data.myFile).subscribe((res2) => {
              this.fileIds.push(res.id);
              this.itemForm.controls.defaultValue.setValue(this.fileIds.join(','));
            });
          });
        }
      });
    }

    setTimeout(
      () =>
        this.dataService
          .create(this.itemForm.getRawValue())
          .pipe(first())
          .subscribe(
            (data) => {
              this.dialogRef.close(data);
            },
            (error) => {
              this.errorService.showError(this.translate.instant('EMAIL-GENERAL.ERRORS.CREATE-FAILED'));
              this.loading = false;
              this.dialogRef.close(null);
            }
          ),
      3000
    );
  }
}
