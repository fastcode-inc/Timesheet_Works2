import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IListColumn, ListColumnType } from 'src/app/common/shared/models/ilistColumn';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { ISearchField, operatorType } from './ISearchCriteria';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-filters',
  templateUrl: './list-filters.component.html',
  styleUrls: ['./list-filters.component.scss'],
})
export class ListFiltersComponent implements OnInit {
  @Input('matChipInputAddOnBlur')
  addOnBlur: boolean;

  @Input('matChipInputSeparatorKeyCodes')
  separatorKeysCodes: number[];

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Input() columnsList: IListColumn[];
  filterFields: IListColumn[] = [];
  selectedFilterFields: ISearchField[] = [];
  selectedDisplayFilterFields: any[] = [];
  noFilterableFields: boolean = true;

  basicFilterForm: FormGroup;
  detailsFilterForm: FormGroup;
  showFilters = false;
  filterButtonText = 'Show filters';

  filterCtrl = new FormControl();

  operators: any;
  booleanOptions: string[] = ['True', 'False'];

  @ViewChild('filterInput', { read: ElementRef, static: false }) filterInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { read: MatAutocomplete, static: false }) matAutocomplete: MatAutocomplete;

  addFieldDialogRef: MatDialogRef<any>;

  mySelector: Boolean = false;
  field: IListColumn | any;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public translate: TranslateService) {}

  ngOnInit() {
    this.initializeFilterForms();
    this.setFilterableFields();
  }

  initializeFilterForms(): void {
    this.basicFilterForm = this.formBuilder.group({
      fieldName: [''],
      searchValue: [''],
      startingValue: [''],
      endingValue: [''],
      operator: ['', Validators.required],
    });
    this.basicFilterForm.addControl('searchText', new FormControl(''));
    this.basicFilterForm.addControl('addFilter', new FormControl(''));
  }

  /**
   * Filters filterable fields from
   * columns list.
   */
  setFilterableFields() {
    this.columnsList.forEach((column) => {
      if (column.filter) {
        this.filterFields.push(column);
      }
    });

    if (this.filterFields.length > 0) {
      this.noFilterableFields = false;
    }
  }

  /**
   * emits onSearch event with selected
   * criteria and resets the form.
   */
  search(): void {
    if (this.field) {
      this.selectFilterField();
      this.filterFields.splice(
        this.filterFields.findIndex((filterField) => filterField === this.field),
        1
      );
      this.filterCtrl.setValue(null);
    }
    this.onSearch.emit(this.selectedFilterFields);
    this.basicFilterForm.reset();
    this.mySelector = false;
  }

  /**
   * Gets currently loaded field from
   * filter form and adds it to selected
   * fields list.
   */
  selectFilterField() {
    let formData = this.basicFilterForm.value;
    this.parseDateFields(formData);
    this.setSelectedDisplayFilterfield(formData);
    this.selectedFilterFields.push(formData);
  }

  /**
   * Gets search values from
   * filter form and in case of
   * date types, parses them
   * into specific string formats
   */
  parseDateFields(formData: any) {
    let searchValue = formData.searchValue;
    let startingValue = formData.startingValue;
    let endingValue = formData.endingValue;

    if (this.field.type == ListColumnType.Date) {
      if (searchValue) {
        searchValue = new Date(searchValue.toString()).toLocaleDateString();
        formData.searchValue = this.parseDateToDefaultStringFormat(new Date(searchValue));
      }
      if (startingValue) {
        startingValue = new Date(startingValue.toString()).toLocaleDateString();
        formData.startingValue = this.parseDateToDefaultStringFormat(new Date(startingValue));
      }
      if (endingValue) {
        endingValue = new Date(endingValue.toString()).toLocaleDateString();
        formData.endingValue = this.parseDateToDefaultStringFormat(new Date(endingValue));
      }
    }
  }

  /**
   * Gets searched field information from
   * given form data and sets it in the chip.
   * @param formData Object containing field and search-content information
   */
  setSelectedDisplayFilterfield(formData: any) {
    switch (formData.operator) {
      case operatorType.Contains:
        this.selectedDisplayFilterFields.push(
          formData.fieldName +
            ': ' +
            this.translate.instant('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.CONTAINS') +
            ' "' +
            formData.searchValue +
            '"'
        );
        break;
      case operatorType.Equals:
        this.selectedDisplayFilterFields.push(
          formData.fieldName +
            ': ' +
            this.translate.instant('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.EQUALS') +
            ' "' +
            formData.searchValue +
            '"'
        );
        break;
      case operatorType.NotEqual:
        this.selectedDisplayFilterFields.push(
          formData.fieldName +
            ': ' +
            this.translate.instant('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.NOT-EQUAL') +
            ' "' +
            formData.searchValue +
            '"'
        );
        break;
      case operatorType.Range:
        let displayField = formData.fieldName + ':';

        if (formData.startingValue) {
          displayField =
            displayField +
            ' ' +
            this.translate.instant('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.FROM') +
            ' "' +
            formData.startingValue +
            '"';
        }

        if (formData.endingValue) {
          displayField =
            displayField +
            ' ' +
            this.translate.instant('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.TO') +
            ' "' +
            formData.endingValue +
            '"';
        }
        this.selectedDisplayFilterFields.push(displayField);
        break;
    }
  }

  /**
   * Parses given date into specific
   * string format.
   * default format: yyyy-MM-dd HH:mm:ss.SSS
   * @param date
   * @returns Parsed string.
   */
  parseDateToDefaultStringFormat(date: Date): string {
    let datestring =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + date.getHours()).slice(-2) +
      ':' +
      ('0' + date.getMinutes()).slice(-2) +
      ':' +
      ('0' + date.getSeconds()).slice(-2) +
      '.' +
      ('00' + date.getMilliseconds()).slice(-3);

    return datestring;
  }

  /**
   * Handler function for option selected
   * event of autocomplete. Sets operators
   * and selected field in form.
   * @param event Emitted MatAutocompleteSelectedEvent object.
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('Selct Value Event :', event);
    //getting Icolumnfield object for selected field
    this.field = this.filterFields?.find((x) => x.searchColumn == event.option.value);
    this.basicFilterForm.controls['fieldName'].setValue(this.field?.searchColumn);
    this.setOperators();
    this.mySelector = true;
  }

  /**
   * Handler function for the remove
   * event of chip. Removes given field
   * from chip, adds it back to list of
   * fields and triggers onSearch event.
   * @param field Field to be removed.
   * @param index Index of the field in
   * the list of selected fields.
   */
  remove(field: string, index: number): void {
    // get listcolumn object from filter field
    let filterField: any = this.columnsList.find((x) => {
      return x.searchColumn == field.split(':')[0];
    });

    // re-add field to filter fields
    this.filterFields.push(filterField);

    this.selectedDisplayFilterFields.splice(index, 1);
    this.selectedFilterFields.splice(index, 1);
    this.onSearch.emit(this.selectedFilterFields);
  }

  /**
   * Sets operators based on selected
   * field type.
   */
  setOperators() {
    this.operators = Object.keys(operatorType).map((k) => operatorType[k as any]);
    if (this.field.type == ListColumnType.String) {
      this.operators.splice(this.operators.indexOf(operatorType.Range), 1);
    } else if (this.field.type == ListColumnType.Boolean) {
      this.operators.splice(this.operators.indexOf(operatorType.Contains), 1);
      this.operators.splice(this.operators.indexOf(operatorType.Range), 1);
    } else {
      this.operators.splice(this.operators.indexOf(operatorType.Contains), 1);
    }
  }
}
