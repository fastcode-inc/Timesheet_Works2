import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ListFiltersComponent, ServiceUtils, DateUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  IPermission,
  PermissionService,
  PermissionDetailsComponent,
  PermissionListComponent,
  PermissionNewComponent,
} from '../';

describe('PermissionListComponent', () => {
  let fixture: ComponentFixture<PermissionListComponent>;
  let component: PermissionListComponent;
  let el: HTMLElement;

  let d = new Date();
  let t = DateUtils.formatDateStringToAMPM(d);
  let constData: IPermission[] = [
    {
      displayName: 'displayName1',
      id: 1,
      name: 'name1',
    },
    {
      displayName: 'displayName2',
      id: 2,
      name: 'name2',
    },
  ];
  let data: IPermission[] = [...constData];

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PermissionListComponent, ListComponent],
        imports: [TestingModule],
        providers: [PermissionService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PermissionListComponent);
      component = fixture.componentInstance;
      data = [...constData];
      fixture.detectChanges();
    });

    it('should create a component', async () => {
      expect(component).toBeTruthy();
    });

    it('should run #ngOnInit()', async () => {
      spyOn(component.dataService, 'getAll').and.returnValue(of(data));
      component.ngOnInit();

      expect(component.items.length).toEqual(data.length);
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(tableRows.length).toBe(data.length);

      expect(component.associations).toBeDefined();
      expect(component.entityName.length).toBeGreaterThan(0);
      expect(component.primaryKeys.length).toBeGreaterThan(0);
      expect(component.columns.length).toBeGreaterThan(0);
      expect(component.selectedColumns.length).toBeGreaterThan(0);
      expect(component.displayedColumns.length).toBeGreaterThan(0);
    });

    it('should run #addNew()', async () => {
      spyOn(component, 'addNew').and.returnValue();
      el = fixture.debugElement.query(By.css('button[name=add]')).nativeElement;
      el.click();
      expect(component.addNew).toHaveBeenCalled();
    });

    it('should run #delete()', async () => {
      component.items = data;
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      let firstRowCells = tableRows[0].querySelectorAll('mat-cell');
      let editButtonCell = firstRowCells[firstRowCells.length - 1];
      let editButton = editButtonCell.querySelectorAll('button')[1];

      spyOn(component, 'delete').and.returnValue();
      editButton.click();
      expect(component.delete).toHaveBeenCalledWith(data[0]);
    });

    it('should call openDetails function when edit button is clicked', async () => {
      component.items = data;
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      let firstRowCells = tableRows[0].querySelectorAll('mat-cell');
      let editButtonCell = firstRowCells[firstRowCells.length - 1];
      let editButton = editButtonCell.querySelectorAll('button')[0];

      spyOn(component, 'openDetails').and.returnValue();
      editButton.click();

      expect(component.openDetails).toHaveBeenCalled();
    });

    it('should call applyFilter function in case of onSearch event of list-filter-component', async () => {
      fixture.detectChanges();

      spyOn(component, 'applyFilter');
      fixture.debugElement.query(By.css('app-list-filters')).triggerEventHandler('onSearch', null);

      expect(component.applyFilter).toHaveBeenCalled();
    });

    it('should pass the selected columns list as input to app list filters', async () => {
      fixture.detectChanges();

      let listFilterElement: DebugElement = fixture.debugElement.query(By.css('app-list-filters'));

      expect(listFilterElement.properties.columnsList).toBe(component.selectedColumns);
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          PermissionListComponent,
          PermissionNewComponent,
          NewComponent,
          PermissionDetailsComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'permission', component: PermissionListComponent },
            { path: 'permission/:id', component: PermissionDetailsComponent },
          ]),
        ],
        providers: [PermissionService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PermissionListComponent);
      component = fixture.componentInstance;
      data = [...constData];
      fixture.detectChanges();
    });

    it('should create a component', async () => {
      expect(component).toBeTruthy();
    });

    it('should run #ngOnInit()', async () => {
      spyOn(component.dataService, 'getAll').and.returnValue(of(data));
      component.ngOnInit();

      expect(component.items.length).toEqual(data.length);
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(tableRows.length).toBe(data.length);

      expect(component.associations).toBeDefined();
      expect(component.entityName.length).toBeGreaterThan(0);
      expect(component.primaryKeys.length).toBeGreaterThan(0);
      expect(component.columns.length).toBeGreaterThan(0);
      expect(component.selectedColumns.length).toBeGreaterThan(0);
      expect(component.displayedColumns.length).toBeGreaterThan(0);
    });

    it('should open new dialog for new entry', async () => {
      component.IsCreatePermission = true;
      fixture.detectChanges();
      spyOn(component.dialog, 'open').and.callThrough();
      el = fixture.debugElement.query(By.css('button[name=add]')).nativeElement;
      el.click();

      expect(component.dialog.open).toHaveBeenCalled();
    });

    it('should delete the item from list', async () => {
      component.items = data;
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      let firstRowCells = tableRows[0].querySelectorAll('mat-cell');
      let deleteButtonCell = firstRowCells[firstRowCells.length - 1];
      let deleteButton = deleteButtonCell.querySelectorAll('button[name="delete"]')[0];

      spyOn(component.dataService, 'delete').and.returnValue(of(null));
      let itemsLength = component.items.length;
      deleteButton.click();
      expect(component.items.length).toBe(itemsLength - 1);
    });

    it('should set the columns list in app list filters component', async () => {
      let listFilters: ListFiltersComponent = fixture.debugElement.query(By.css('app-list-filters')).componentInstance;

      expect(listFilters.columnsList).toEqual(component.selectedColumns);
    });

    it('should verify that redirected to details page when edit button is clicked', async () => {
      const router = TestBed.inject(Router);
      const location = TestBed.inject(Location);
      component.items = data;
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('mat-row');
      let firstRowCells = tableRows[0].querySelectorAll('mat-cell');
      let editButtonCell = firstRowCells[firstRowCells.length - 1];
      let editButton = editButtonCell.querySelectorAll('button[name="edit"]')[0];

      spyOn(component.dataService, 'getById').and.returnValue(of(data[0]));
      let navigationSpy = spyOn(router, 'navigate').and.callThrough();
      editButton.click();

      let responsePromise = navigationSpy.calls.mostRecent().returnValue;
      await responsePromise;

      expect(decodeURIComponent(location.path())).toBe(
        `/permission/${ServiceUtils.encodeIdByObject(data[0], component.primaryKeys)}`
      );
    });

    it('should emit onSearch event of list-filter-component and call applyFilter function', async () => {
      let filteredArray = [data[0]];
      spyOn(component.dataService, 'getAssociations').and.returnValue(of(filteredArray));
      spyOn(component.dataService, 'getAll').and.returnValue(of(filteredArray));

      let filterableColumns = component.columns.filter((x) => x.filter);
      if (filterableColumns.length > 0) {
        let searchButton = fixture.debugElement.query(By.css('app-list-filters')).query(By.css('button')).nativeElement;
        searchButton.click();

        expect(component.items).toEqual(filteredArray);
      }
    });
  });
});
