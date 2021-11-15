import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ListFiltersComponent } from './list-filters.component';

import { TestingModule } from 'src/testing/utils';
import { checkValues } from 'src/testing/utils';
import { IListColumn, ListColumnType } from 'src/app/common/shared/models/ilistColumn';
import { operatorType } from './ISearchCriteria';

describe('ListFiltersComponent', () => {
  @Component({
    selector: `host-component`,
    template: `<app-list-filters [columnsList]="columns" (onSearch)="applyFilter()"></app-list-filters>`,
  })
  class TestHostComponent {
    columns: IListColumn[] = [
      {
        column: 'column1',
        label: 'Column 1',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
      {
        column: 'coolumn2',
        label: 'Column 2',
        sort: true,
        filter: true,
        type: ListColumnType.String,
      },
    ];

    applyFilter() {}
  }

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let component: ListFiltersComponent;
  let fixture: ComponentFixture<ListFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, ListFiltersComponent],
      imports: [TestingModule],
      providers: [ChangeDetectorRef],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    component = testHostFixture.debugElement.children[0].componentInstance;
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse search value of date fields', () => {
    component.field = getField(ListColumnType.Date);
    let formData = {
      searchValue: new Date().toUTCString(),
    };
    spyOn(component, 'parseDateToDefaultStringFormat').and.returnValue('parsed');
    component.parseDateFields(formData);
    expect(formData.searchValue).toEqual('parsed');
  });

  it('should parse starting and ending values of date fields', () => {
    component.field = getField(ListColumnType.Date);
    let formData = {
      startingValue: new Date().toUTCString(),
      endingValue: new Date().toUTCString(),
    };
    spyOn(component, 'parseDateToDefaultStringFormat').and.returnValue('parsed');
    component.parseDateFields(formData);
    expect(formData.startingValue).toEqual('parsed');
    expect(formData.endingValue).toEqual('parsed');
  });

  it('should select display field with contains operator', () => {
    let formData = getFormData(operatorType.Contains);
    component.selectedDisplayFilterFields = [];
    spyOn(component.translate, 'instant')
      .withArgs('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.CONTAINS')
      .and.returnValue('contains');
    component.setSelectedDisplayFilterfield(formData);
    expect(component.selectedDisplayFilterFields[0]).toEqual('f1: contains "searchText"');
  });

  it('should select display field with equals operator', () => {
    let formData = getFormData();
    component.selectedDisplayFilterFields = [];
    spyOn(component.translate, 'instant')
      .withArgs('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.EQUALS')
      .and.returnValue('is equal to');

    component.setSelectedDisplayFilterfield(formData);
    expect(component.selectedDisplayFilterFields[0]).toEqual('f1: is equal to "searchText"');
  });

  it('should select display field with not equal operator', () => {
    let formData = getFormData(operatorType.NotEqual);
    component.selectedDisplayFilterFields = [];
    spyOn(component.translate, 'instant')
      .withArgs('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.NOT-EQUAL')
      .and.returnValue('is not equal to');

    component.setSelectedDisplayFilterfield(formData);
    expect(component.selectedDisplayFilterFields[0]).toEqual('f1: is not equal to "searchText"');
  });

  it('should select display field with range operator', () => {
    let formData = {
      startingValue: 1,
      endingValue: 2,
      operator: operatorType.Range,
      fieldName: 'f1',
    };
    component.selectedDisplayFilterFields = [];
    spyOn(component.translate, 'instant')
      .withArgs('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.TO')
      .and.returnValue('to')
      .withArgs('LIST-FILTERS.FIELD-CRITERIA-DISPLAY.FROM')
      .and.returnValue('from');
    component.setSelectedDisplayFilterfield(formData);
    expect(component.selectedDisplayFilterFields[0]).toEqual('f1: from "1" to "2"');
  });

  it('should set filter fields', () => {
    let formData = getFormData();
    component.basicFilterForm.reset();
    component.basicFilterForm.patchValue(formData);
    testHostFixture.detectChanges();
    spyOn(component, 'parseDateFields').and.returnValue();
    spyOn(component, 'setSelectedDisplayFilterfield').and.returnValue();

    component.selectFilterField();
    expect(checkValues(component.basicFilterForm.value, formData)).toEqual(true);
  });

  it('should search based on filter criteria', () => {
    let field = getField();
    component.field = field;
    component.filterFields = [field];
    let formData = getFormData();
    component.selectedFilterFields = [formData];
    spyOn(component, 'selectFilterField').and.returnValue();
    spyOn(component.onSearch, 'emit').and.returnValue();

    component.search();
    expect(component.filterFields.length).toEqual(0);
    expect(component.filterCtrl.value).toEqual(null);
    expect(component.onSearch.emit).toHaveBeenCalledWith([formData]);
    expect(component.basicFilterForm.pristine).toEqual(true);
    expect(component.mySelector).toEqual(false);
  });

  it('should parse date to default format string', () => {
    //default format: yyyy-MM-dd HH:mm:ss.SSS
    let d = new Date(0);
    d.setHours(0);
    d.setMinutes(0);
    d.setMilliseconds(0);
    d.setFullYear(1970);
    d.setMonth(0);
    d.setDate(1);
    expect(component.parseDateToDefaultStringFormat(d)).toEqual(`1970-01-01 00:00:00.000`);
  });

  it('should remove chip item', () => {
    component.columnsList = [getField()];
    component.filterFields = [];
    component.selectedDisplayFilterFields = ['f1: contains "searchText"'];
    component.selectedFilterFields = [getFormData()];
    spyOn(component.onSearch, 'emit').and.returnValue();
    testHostFixture.detectChanges();

    component.remove(getField().column, 0);

    expect(component.filterFields.length).toEqual(1);
    expect(component.selectedFilterFields.length).toEqual(0);
    expect(component.selectedDisplayFilterFields.length).toEqual(0);
    expect(component.onSearch.emit).toHaveBeenCalledWith([]);
  });

  it('should set it in form when field is selected', () => {
    let field = getField();
    component.filterFields = [field];
    spyOn(component, 'setOperators').and.returnValue();
    testHostFixture.detectChanges();

    let option: any = {};
    option.value = field.column;
    let event: any = {};
    event.option = option;
    component.selected(event);
    testHostFixture.detectChanges();

    expect(component.field).toEqual(field);
    expect(component.basicFilterForm.value['fieldName']).toEqual(field.column);
    expect(component.setOperators).toHaveBeenCalled();
    expect(component.mySelector).toEqual(true);
  });

  it('should set operators for string fields', () => {
    component.field = getField();
    testHostFixture.detectChanges();

    component.setOperators();
    expect(component.operators).toEqual([operatorType.Contains, operatorType.Equals, operatorType.NotEqual]);
  });

  it('should set operators for string fields', () => {
    component.field = getField(ListColumnType.Boolean);
    testHostFixture.detectChanges();

    component.setOperators();
    expect(component.operators).toEqual([operatorType.Equals, operatorType.NotEqual]);
  });

  it('should set operators for numeric/date fields', () => {
    component.field = getField(ListColumnType.Number);
    testHostFixture.detectChanges();

    component.setOperators();
    expect(
      component.operators.sort().join(',') ===
        [operatorType.Equals, operatorType.NotEqual, operatorType.Range].sort().join(',')
    ).toEqual(true);
  });
});

function getFormData(opType?: operatorType) {
  return {
    searchValue: 'searchText',
    operator: opType ? opType : operatorType.Equals,
    fieldName: 'f1',
  };
}

function getField(fType?: ListColumnType): IListColumn {
  return {
    column: 'f1',
    searchColumn: 'f1',
    label: 'f1',
    type: fType ? fType : ListColumnType.String,
    sort: false,
    filter: true,
  };
}
