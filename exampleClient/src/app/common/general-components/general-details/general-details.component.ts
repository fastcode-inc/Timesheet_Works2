import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAssociationEntry } from 'src/app/common/shared';

@Component({
  selector: 'fc-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
})
export class GeneralDetailsComponent implements OnInit {
  @Input() itemForm: FormGroup;
  @Input() fields: any[];
  @Input() parentAssociations: IAssociationEntry[];
  @Input() childAssociations: any;
  @Input() IsUpdatePermission: any;
  @Input() loading: any;
  @Input() idParam: any;
  @Input() title: any;

  @Output() onPickerScroll: EventEmitter<any> = new EventEmitter();
  @Output() onSelectAssociation: EventEmitter<any> = new EventEmitter();
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
  downloadFile(file: any) {
    this.onDownloadFile.emit(file);
  }

  submit() {
    this.onSubmit.emit();
  }

  openDetails(association: any) {
    this.openChildDetails.emit(association);
  }
}
