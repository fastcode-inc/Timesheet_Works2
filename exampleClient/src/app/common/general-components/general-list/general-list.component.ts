import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IAssociationEntry } from 'src/app/common/shared';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'fc-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListComponent implements OnInit {
  @Input() IsCreatePermission: boolean;
  @Input() IsDeletePermission: boolean;
  @Input() items: any[];
  @Input() selectedColumns: any[];
  @Input() displayedColumns: any[];
  @Input() title: string;
  @Input() isLoadingResults: boolean;
  @Input() selectedAssociation: IAssociationEntry;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() onOpenDetails: EventEmitter<any> = new EventEmitter();
  @Output() onTableScroll: EventEmitter<any> = new EventEmitter();
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Output() onBack: EventEmitter<any> = new EventEmitter();
  @Output() onAddNew: EventEmitter<any> = new EventEmitter();

  defaultDateFormat: string = 'mediumDate';
  defaultDateTimeFormat: string = 'medium';

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit() {}

  openDetails(item: any) {
    this.onOpenDetails.emit(item);
  }

  delete(item: any) {
    this.onDelete.emit(item);
  }

  back() {
    this.onBack.emit();
  }

  tableScroll() {
    this.onTableScroll.emit();
  }

  search($event: any) {
    this.onSearch.emit($event);
  }

  addNew() {
    this.onAddNew.emit();
  }

  /**
   * Splits camelCase string to space separated.
   * @param field String to be splitted.
   * @returns Space separated string.
   */
  getFieldLabel(field: string) {
    field = field.charAt(0).toUpperCase() + field.slice(1);
    return field.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
}
