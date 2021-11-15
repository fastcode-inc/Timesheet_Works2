import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { TestingModule } from 'src/testing/utils';
import { IDummy, DummyService, DummyDetailsComponent, DummyListComponent } from './dummy/index';
import { ISearchField, operatorType } from '../components/list-filters/ISearchCriteria';

describe('BaseDetailsComponent', () => {
  let component: DummyDetailsComponent;
  let fixture: ComponentFixture<DummyDetailsComponent>;

  let data: IDummy = {
    id: 1,
    name: 'name1',
    parentId: 1,
    parentDescriptiveField: 'parent1',
  };
  const parentData: any = [{ id: 1, name: 'parent1' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DummyDetailsComponent, DummyListComponent],
      imports: [
        TestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dummy', component: DummyListComponent },
          { path: 'dummy/:id', component: DummyDetailsComponent },
          { path: 'child', component: DummyListComponent },
          { path: 'onechild/:id', component: DummyDetailsComponent },
        ]),
      ],
      providers: [DummyService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    spyOn(component.dataService, 'getById').and.returnValue(of(data));
    component.ngOnInit();

    expect(component.item).toEqual(data);
    expect(component.itemForm.getRawValue()).toEqual(data);
    expect(component.itemForm.valid).toEqual(true);
    expect(component.title.length).toBeGreaterThan(0);
    expect(component.associations).toBeDefined();
    expect(component.childAssociations).toBeDefined();
    expect(component.parentAssociations).toBeDefined();
  });

  it('should run #ngOnInit()', async () => {
    component.idParam = '1';
    spyOn(component.errorService, 'showError').and.returnValue();
    spyOn(component.dataService, 'getById').and.returnValue(
      Observable.create((observer: any) => {
        observer.error(new Error('an error occurred'));
      })
    );

    component.getItem();
    expect(component.errorService.showError).toHaveBeenCalled();
  });

  it('should update entry', async () => {
    component.item = data;
    component.itemForm.patchValue(data);
    component.itemForm.enable();
    fixture.detectChanges();

    spyOn(component.dataService, 'update').and.returnValue(of(data));
    component.onSubmit(component.itemForm.getRawValue());

    expect(component.dataService.update).toHaveBeenCalledWith(data, component.idParam);
  });

  it('should show error occurred while updating', async () => {
    component.item = data;
    fixture.detectChanges();

    spyOn(component.errorService, 'showError').and.returnValue();
    spyOn(component.dataService, 'update').and.returnValue(
      Observable.create((observer: any) => {
        observer.error(new Error('an error occurred'));
      })
    );

    component.onSubmit(component.itemForm.getRawValue());
    expect(component.errorService.showError).toHaveBeenCalled();
  });

  it('should return immediately while updating if itemForm is invalid', async () => {
    component.itemForm.setErrors({ invalid: true });
    component.onSubmit(component.itemForm.getRawValue());
    expect(component.submitted).toBe(false);
  });

  it('should call the back', async () => {
    component.item = data;
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);
    let navigationSpy = spyOn(router, 'navigateByUrl').and.callThrough();

    component.item = data;
    fixture.detectChanges();
    component.onBack();

    let responsePromise = navigationSpy.calls.mostRecent().returnValue;
    await responsePromise;
    expect(location.path()).toBe('/dummy');
  });

  it('should set all permissions', async () => {
    spyOn(component.globalPermissionService, 'hasPermissionOnEntity').withArgs('Dummy', 'CREATE').and.returnValue(true);
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
    component.itemForm.markAsDirty();
    expect(component.canDeactivate()).toBe(false);
  });

  it('should initialize picker info', async () => {
    component.initializePickerPageInfo();
    expect(component.hasMoreRecordsPicker).toEqual(true);
    expect(component.pickerPageSize).toEqual(30);
    expect(component.lastProcessedOffsetPicker).toEqual(-1);
    expect(component.currentPickerPage).toEqual(0);
  });

  it('should get query parameters for association', async () => {
    component.item = data;
    fixture.detectChanges();

    let queryParams = component.getQueryParams(component.associations[0]);
    expect(queryParams).toEqual({ dummyId: 1 });
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

  it('should open child details in case of onetomany association', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.idParam = '1';
    component.item = data;
    fixture.detectChanges();

    component.openChildDetails(component.associations[0]);

    expect(router.navigate).toHaveBeenCalledWith(['/' + component.associations[0].table?.toLowerCase()], {
      queryParams: { dummyId: 1 },
    });
  });

  it('should open child details in case of onetoone association', async () => {
    const router = TestBed.inject(Router);
    spyOn(component.dataService, 'getChild').and.returnValue(of({ id: 1 }));
    spyOn(router, 'navigate').and.callThrough();
    component.idParam = '1';
    component.item = data;
    fixture.detectChanges();

    component.openChildDetails(component.associations[2]);

    expect(router.navigate).toHaveBeenCalledWith(['/' + component.associations[2].table?.toLowerCase() + '/1']);
  });

  it('should show error while fetching child details', async () => {
    spyOn(component.errorService, 'showError').and.returnValue();
    spyOn(component.dataService, 'getChild').and.returnValue(
      Observable.create((observer: any) => {
        observer.error(new Error('an error occurred'));
      })
    );
    component.idParam = '1';
    fixture.detectChanges();

    component.openChildDetails(component.associations[2]);

    expect(component.errorService.showError).toHaveBeenCalled();
  });

  it('should get the list of associated parent', async () => {
    let association = component.associations[1];

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
    let association = component.associations[1];
    spyOn(component, 'initializePickerPageInfo').and.callFake(() => {
      component.hasMoreRecordsPicker = true;
      component.pickerPageSize = 30;
      component.lastProcessedOffsetPicker = -1;
      component.currentPickerPage = 0;
    });
    spyOn(component.errorService, 'showError').and.returnValue();
    if (association.service) {
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
    let association = component.associations[1];
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
    let association = component.associations[1];
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
    let association = component.associations[1];
    component.isLoadingPickerResults = true;

    if (association.service) {
      spyOn(association.service, 'getAll').and.callThrough();
    }
    component.onPickerScroll(association);

    expect(association.service?.getAll).toHaveBeenCalledTimes(0);
  });

  it('should load more data for the list of associated parent when some input is entered', async () => {
    let association = component.associations[1];
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
    let association = component.associations[1];
    component.onPickerClose(parentData[0], association);
    if (association.column) {
      association.column.forEach((col) => {
        expect(component.itemForm.get(col.key)?.value).toEqual(parentData[0][col.referencedkey]);
      });
    }
    if (association.referencedDescriptiveField) {
      expect(component.itemForm.get(association.descriptiveField)?.value).toEqual(
        parentData[0][association.referencedDescriptiveField]
      );
    }
  });
});
