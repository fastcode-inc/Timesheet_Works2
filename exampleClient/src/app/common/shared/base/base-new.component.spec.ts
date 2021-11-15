import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TestingModule, checkValues } from 'src/testing/utils';
import { IDummy, DummyService, DummyNewComponent, DummyListComponent } from './dummy/index';
import { ISearchField, operatorType } from '../components/list-filters/ISearchCriteria';

describe('BaseNewComponent', () => {
  let component: DummyNewComponent;
  let fixture: ComponentFixture<DummyNewComponent>;
  const relationData = {
    parentId: 1,
    parentDescriptiveField: 'parent1',
  };
  let data: IDummy = {
    id: 1,
    name: 'name1',
    ...relationData,
  };
  const parentData: any = [{ id: 1, name: 'parent1' }];

  describe('', () => {
    it('should set the passed data to form', async () => {
      TestBed.configureTestingModule({
        declarations: [DummyNewComponent, DummyListComponent],
        imports: [TestingModule, RouterTestingModule.withRoutes([{ path: 'dummy', component: DummyListComponent }])],
        providers: [DummyService, { provide: MAT_DIALOG_DATA, useValue: relationData }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(DummyNewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      component.checkPassedData();
      fixture.detectChanges();
      expect(checkValues(component.itemForm.getRawValue(), relationData)).toBe(true);
    });
  });

  describe('', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [DummyNewComponent, DummyListComponent],
        imports: [TestingModule, RouterTestingModule.withRoutes([{ path: 'dummy', component: DummyListComponent }])],
        providers: [DummyService, { provide: MAT_DIALOG_DATA, useValue: {} }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(DummyNewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should run #ngOnInit()', async () => {
      spyOn(component.dataService, 'getById').and.returnValue(of(data));
      component.ngOnInit();

      expect(component.itemForm).toBeDefined();
      expect(component.title.length).toBeGreaterThan(0);
      expect(component.associations).toBeDefined();
      expect(component.parentAssociations).toBeDefined();
    });

    it('should create new entry and close the dialog', async () => {
      component.itemForm.patchValue(data);
      component.itemForm.enable();
      fixture.detectChanges();
      spyOn(component.dataService, 'create').and.returnValue(of(data));
      spyOn(component.dialogRef, 'close').and.returnValue();

      component.onSubmit(component.itemForm.getRawValue());

      expect(component.dataService.create).toHaveBeenCalledWith(data);
      expect(component.dialogRef.close).toHaveBeenCalledWith(data);
    });

    it('should show error occurred while creating new entry and close the dialog', async () => {
      spyOn(component.errorService, 'showError').and.returnValue();
      spyOn(component.dialogRef, 'close').and.returnValue();
      spyOn(component.dataService, 'create').and.returnValue(
        Observable.create((observer: any) => {
          observer.error(new Error('an error occurred'));
        })
      );

      component.onSubmit(component.itemForm.getRawValue());

      expect(component.errorService.showError).toHaveBeenCalled();
      expect(component.dialogRef.close).toHaveBeenCalledWith(null);
    });

    it('should return immediately if itemForm is invalid while creating', async () => {
      component.itemForm.setErrors({ invalid: true });
      component.onSubmit(component.itemForm.getRawValue());
      expect(component.submitted).toBe(false);
    });

    it('should close the dialog when onCancel is called', async () => {
      spyOn(component.dialogRef, 'close').and.returnValue();

      component.onCancel();

      expect(component.dialogRef.close).toHaveBeenCalledWith(null);
    });

    it('should set all permissions', async () => {
      spyOn(component.globalPermissionService, 'hasPermissionOnEntity')
        .withArgs('Dummy', 'CREATE')
        .and.returnValue(true);
      component.setPermissions();
      fixture.detectChanges();

      expect(component.IsCreatePermission).toBe(true);
      expect(component.IsReadPermission).toBe(true);
      expect(component.IsDeletePermission).toBe(true);
      expect(component.IsUpdatePermission).toBe(true);
    });

    it('should set all permissions except Create', async () => {
      spyOn(component.globalPermissionService, 'hasPermissionOnEntity')
        .withArgs('Dummy', 'CREATE')
        .and.returnValue(false)
        .withArgs('Dummy', 'UPDATE')
        .and.returnValue(true)
        .withArgs('Dummy', 'DELETE')
        .and.returnValue(true);
      component.setPermissions();
      fixture.detectChanges();

      expect(component.IsCreatePermission).toBe(false);
      expect(component.IsReadPermission).toBe(true);
      expect(component.IsDeletePermission).toBe(true);
      expect(component.IsUpdatePermission).toBe(true);
    });

    it('should be able to deactivate', async () => {
      expect(component.canDeactivate()).toBe(true);
    });

    it('should not be able to deactivate', async () => {
      component.itemForm.markAsTouched();
      expect(component.canDeactivate()).toBe(false);
    });

    it('should initialize picker info', async () => {
      component.initializePickerPageInfo();
      expect(component.hasMoreRecordsPicker).toEqual(true);
      expect(component.pickerPageSize).toEqual(30);
      expect(component.lastProcessedOffsetPicker).toEqual(-1);
      expect(component.currentPickerPage).toEqual(0);
    });

    it('should update picker page info when more data is available', async () => {
      let currentPickerPage = component.currentPickerPage;
      let lastProcessedOffsetPicker = component.lastProcessedOffsetPicker;
      component.updatePickerPageInfo([data]);

      expect(component.currentPickerPage).toEqual(currentPickerPage + 1);
      expect(component.lastProcessedOffsetPicker).toEqual(lastProcessedOffsetPicker + 1);
    });

    it('should update picker page info when more data is not available', async () => {
      component.updatePickerPageInfo([]);
      expect(component.hasMoreRecordsPicker).toEqual(false);
    });

    it('should get the list of associated parent', async () => {
      let association = component.associations[0];
      spyOn(component, 'initializePickerPageInfo').and.callFake(() => {
        component.hasMoreRecordsPicker = true;
        component.pickerPageSize = 30;
        component.lastProcessedOffsetPicker = -1;
        component.currentPickerPage = 0;
      });
      spyOn(component, 'updatePickerPageInfo').and.returnValue();
      if (association.service) {
        spyOn(association.service, 'getAll').and.returnValue(of(parentData));
      }
      component.selectAssociation(association);

      expect(component.updatePickerPageInfo).toHaveBeenCalled();
      expect(association.data).toEqual(parentData);
    });

    it('should show error while fetching the list of associated parent', async () => {
      let association = component.associations[0];
      spyOn(component, 'initializePickerPageInfo').and.callFake(() => {
        component.hasMoreRecordsPicker = true;
        component.pickerPageSize = 30;
        component.lastProcessedOffsetPicker = -1;
        component.currentPickerPage = 0;
      });
      spyOn(component.errorService, 'showError').and.returnValue();
      if (association.service) {
        spyOn(association.service, 'getById').and.returnValue(of(parentData[0]));
        spyOn(association.service, 'getAll').and.returnValue(
          Observable.create((observer: any) => {
            observer.error(new Error('an error occurred'));
          })
        );
      }
      component.selectAssociation(association);

      expect(component.errorService.showError).toHaveBeenCalled();
    });

    it('should load more data for the list of associated parent when scrolled', async () => {
      let association = component.associations[0];
      association.data = parentData;
      component.hasMoreRecordsPicker = true;
      component.pickerPageSize = 30;
      component.lastProcessedOffsetPicker = -1;
      component.currentPickerPage = 0;
      component.isLoadingPickerResults = false;

      if (association.service) {
        spyOn(association.service, 'getAll').and.returnValue(of(parentData));
      }
      spyOn(component, 'updatePickerPageInfo').and.returnValue();

      component.pickerDialogRef = component.pickerDialogService.open({ DisplayField: '', Title: '' });
      component.onPickerScroll(association);

      expect(association.data.length).toEqual(parentData.length * 2);
      expect(component.isLoadingPickerResults).toEqual(false);
      expect(component.updatePickerPageInfo).toHaveBeenCalled();
    });

    it('should not load more data for the list of associated parent when scrolled', async () => {
      let association = component.associations[0];
      association.data = parentData;
      component.hasMoreRecordsPicker = true;
      component.pickerPageSize = 30;
      component.lastProcessedOffsetPicker = -1;
      component.currentPickerPage = 0;
      component.isLoadingPickerResults = false;

      if (association.service) {
        spyOn(association.service, 'getAll').and.returnValue(
          Observable.create((observer: any) => {
            observer.error(new Error('an error occurred'));
          })
        );
      }
      spyOn(component.errorService, 'showError').and.returnValue();

      component.onPickerScroll(association);

      expect(component.errorService.showError).toHaveBeenCalled();
    });

    it('should not call getAll method of service if first condition is not true', async () => {
      let association = component.associations[0];
      component.isLoadingPickerResults = true;

      if (association.service) {
        spyOn(association.service, 'getAll').and.callThrough();
      }
      component.onPickerScroll(association);

      expect(association.service?.getAll).toHaveBeenCalledTimes(0);
    });

    it('should load more data for the list of associated parent when some input is entered', async () => {
      let association = component.associations[0];
      let searchValue: string = 'test';
      let searchField: ISearchField = {
        fieldName: association.referencedDescriptiveField,
        operator: operatorType.Contains,
        searchValue: searchValue ? searchValue : '',
      };
      association.searchValue = [searchField];

      spyOn(component, 'updatePickerPageInfo').and.returnValue();
      if (association.service) {
        spyOn(association.service, 'getAll').and.returnValue(of(parentData));
      }
      component.pickerDialogRef = component.pickerDialogService.open({ DisplayField: '', Title: '' });
      component.onPickerSearch(searchValue, association);

      expect(association.data.length).toEqual(parentData.length);
      expect(component.isLoadingPickerResults).toEqual(false);
      expect(component.updatePickerPageInfo).toHaveBeenCalled();
    });

    it('should update the form when some option from picker is selected for association', async () => {
      let association = component.associations[0];
      component.onPickerClose(parentData[0], association);

      association.column?.forEach((col) => {
        expect(component.itemForm.get(col.key)?.value).toEqual(parentData[0][col.referencedkey]);
      });
      if (association.descriptiveField && association.referencedDescriptiveField) {
        expect(component.itemForm.get(association.descriptiveField)?.value).toEqual(
          parentData[0][association.referencedDescriptiveField]
        );
      }
    });
  });
});
