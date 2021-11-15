import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAssociationEntry } from 'src/app/common/shared';

@Component({
  selector: 'fc-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent implements OnInit {
  @Input() itemForm: FormGroup;
  @Input() fields: any[];
  @Input() parentAssociations: IAssociationEntry[];
  @Output() onPickerScroll: EventEmitter<any> = new EventEmitter();
  @Output() onSelectAssociation: EventEmitter<any> = new EventEmitter();

  @Input() childAssociations: any;
  @Input() IsUpdatePermission: any;
  @Input() loading: any;
  @Output() onBack: EventEmitter<any> = new EventEmitter();
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() openChildDetails: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadFile: EventEmitter<any> = new EventEmitter();

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {}

  pickerScroll(association: any) {
    this.onPickerScroll.emit(association);
  }

  selectAssociation(association: any) {
    this.onSelectAssociation.emit(association);
  }

  back() {
    this.onBack.emit();
  }

  submit() {
    this.onSubmit.emit();
  }

  openDetails(association: any) {
    this.openChildDetails.emit(association);
  }
  downloadFile(fieldName: any) {
    this.onDownloadFile.emit(fieldName);
  }

  addItem(field: string, type: string): void {
    if (type == 'file') {
      (<FormArray>this.itemForm.get(`${field}FileSource`)).push(new FormControl(''));
      (<FormArray>this.itemForm.get(field)).push(new FormControl(''));
    } else {
      (<FormArray>this.itemForm.get(field)).push(new FormControl(''));
    }
  }

  removeItem(field: string, index: number) {
    (<FormArray>this.itemForm.get(field)).removeAt(index);
  }

  handleFileInput(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.itemForm.get(`${field}FileSource`)?.setValue(file);
      this.itemForm.get(`is${field[0].toUpperCase() + field.slice(1)}Updated`)?.setValue(true);
    }
  }

  handleFileInputArray(event: any, field: any, index: any) {
    if (event.target.files.length > 0) {
      var file: any[] = event.target.files[0];
      (<FormArray>this.itemForm.get(`${field}FileSource`))?.controls[index]?.setValue(file);
      (<FormArray>this.itemForm.get(`is${field[0].toUpperCase() + field.slice(1)}Updated`))?.controls[index]?.setValue(
        true
      );
    }
  }

  removeFile(field: string) {
    this.itemForm.get(`${field}FileSource`)?.setValue(null);
    this.itemForm.get(`is${field[0].toUpperCase() + field.slice(1)}Updated`)?.setValue(true);
  }
}
