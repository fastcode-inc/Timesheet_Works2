import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceUtils } from 'src/app/common/shared';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { IDummy, DummyService, DummyDetailsComponent, DummyListComponent, DummyNewComponent } from './dummy/index';
import { listProcessingType } from './base-list.component';
import { operatorType } from '../components/list-filters/ISearchCriteria';
import { FormBuilder } from '@angular/forms';
import { ListComponent } from 'src/app/common/general-components/index';

describe('DummyListComponent', () => {
  let fixture: ComponentFixture<DummyListComponent>;
  let component: DummyListComponent;
  const constData: IDummy[] = [
    {
      id: 1,
      name: 'name1',
      parentId: 1,
      parentDescriptiveField: 'parent1',
    },
    {
      id: 2,
      name: 'name2',
      parentId: 1,
      parentDescriptiveField: 'parent1',
    },
  ];
  let data: IDummy[] = Object.assign([], constData);
  const parentData = { id: 1, name: 'parent1' };
  const filterCriteria = [
    {
      fieldName: 'name',
      operator: operatorType.Equals,
      searchValue: 'p',
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DummyListComponent, DummyDetailsComponent, DummyNewComponent, ListComponent].concat(
        EntryComponents
      ),
      imports: [
        TestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dummy', component: DummyListComponent },
          { path: 'dummy/new', component: DummyNewComponent },
          { path: 'dummy/:id', component: DummyDetailsComponent },
          { path: 'parent/1', component: DummyDetailsComponent },
        ]),
      ],
      providers: [DummyService, ChangeDetectorRef],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyListComponent);
    component = fixture.componentInstance;
    data = Object.assign([], constData);
    fixture.detectChanges();
  });

  // it('should create a component', async () => {
  //   expect(component).toBeTruthy();
  // });

  it('should run #ngOnInit()', async () => {
    spyOn(component.dataService, 'getAll').and.returnValue(of(data));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.items.length).toEqual(data.length);
    expect(component.associations).toBeDefined();
    expect(component.entityName.length).toBeGreaterThan(0);
    expect(component.primaryKeys.length).toBeGreaterThan(0);
    expect(component.columns.length).toBeGreaterThan(0);
    expect(component.selectedColumns.length).toBeGreaterThan(0);
    expect(component.displayedColumns.length).toBeGreaterThan(0);
  });

  it('should open new dialog for new entry', async () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.addNew();

    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should open new dialog for new entry when some association is selected', async () => {
    component.selectedAssociation = component.associations[0];
    if (component.selectedAssociation.column) {
      component.selectedAssociation.column[0].value = '1';
    }
    component.selectedAssociation.associatedObj = { name: 'parent1' };
    spyOn(component, 'openDialog').and.callThrough();
    spyOn(component.dialog, 'open').and.callThrough();
    const dialogData = { parentId: '1', parentDescriptiveField: 'parent1' };
    fixture.detectChanges();
    component.addNew();

    expect(component.openDialog).toHaveBeenCalledWith(DummyNewComponent, dialogData);
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should delete the item from list', async () => {
    component.items = data;
    fixture.detectChanges();

    spyOn(component.dataService, 'delete').and.returnValue(of(null));
    let itemsLength = component.items.length;
    component.delete(data[0]);

    expect(component.items.length).toBe(itemsLength - 1);
  });

  it('should verify that redirected to details page when open details is called', async () => {
    const router = TestBed.inject(Router);
    const location = TestBed.inject(Location);
    component.items = data;
    fixture.detectChanges();

    spyOn(component.dataService, 'getById').and.returnValue(of(data[0]));
    let navigationSpy = spyOn(router, 'navigate').and.callThrough();
    component.openDetails(data[0]);

    let responsePromise = navigationSpy.calls.mostRecent().returnValue;
    await responsePromise;

    expect(location.path()).toBe(`/dummy/${ServiceUtils.encodeIdByObject(data[0], component.primaryKeys)}`);
  });

  it('should filter array based on criteria when parent association is selected and applyFilter is called', async () => {
    let filteredArray = [data[0]];
    component.selectedAssociation = component.associations[0];
    if (component.selectedAssociation.column) {
      component.selectedAssociation.column[0].value = '1';
    }
    component.initializePageInfo();
    if (component.selectedAssociation.service) {
      spyOn(component.selectedAssociation.service, 'getAssociations').and.returnValue(of(filteredArray));
    }
    fixture.detectChanges();

    component.applyFilter(filterCriteria);
    expect(component.selectedAssociation.service?.getAssociations).toHaveBeenCalledWith(
      component.selectedAssociation.url,
      '1',
      filterCriteria,
      0,
      component.pageSize,
      ''
    );
    expect(component.items).toEqual(filteredArray);
  });

  it('should filter array based on criteria when no association is selected and applyFilter is called', async () => {
    let filteredArray = [data[0]];
    component.initializePageInfo();
    spyOn(component.dataService, 'getAll').and.returnValue(of(filteredArray));
    fixture.detectChanges();

    component.applyFilter(filterCriteria);
    expect(component.dataService.getAll).toHaveBeenCalledWith(filterCriteria, 0, component.pageSize, '');
    expect(component.items).toEqual(filteredArray);
  });

  it('should split camel case string', async () => {
    let sampleString: string = component.getFieldLabel('sampleString');
    expect(sampleString).toEqual('Sample String');
  });

  it('should show error', async () => {
    spyOn(component.errorService, 'showError').and.returnValue();
    let obs = new Observable<IDummy[]>((observer) => {
      observer.error(new Error('an error occurred'));
    });
    component.processListObservable(obs, listProcessingType.Replace);

    expect(component.errorService.showError).toHaveBeenCalled();
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

  it('should call setSort and set item list when some association is selected', async () => {
    component.selectedAssociation = component.associations[0];
    if (component.selectedAssociation.column) {
      component.selectedAssociation.column[0].value = '1';
    }
    component.initializePageInfo();
    if (component.selectedAssociation.service?.getAssociations) {
      spyOn(component.selectedAssociation.service, 'getAssociations').and.returnValue(of(data));
    }
    fixture.detectChanges();

    component.setSort();
    expect(component.items.length).toBe(data.length);
  });

  it('should show error occurred while fetching the list', async () => {
    spyOn(component.errorService, 'showError').and.returnValue();
    let obs = new Observable<IDummy[]>((observer) => {
      observer.error(new Error('an error occurred'));
    });
    spyOn(component.dataService, 'getAll').and.returnValue(obs);

    component.setSort();
    expect(component.errorService.showError).toHaveBeenCalled();
  });

  it('should set columns lists in case of screens larger than medium', async () => {
    component.global.isMediumDeviceOrLess$ = of(false);
    fixture.detectChanges();
    component.manageScreenResizing();

    expect(component.selectedColumns.length).toEqual(component.columns.length);
    expect(component.displayedColumns.length).toEqual(component.columns.length);
  });

  it('should get list of items when some association is selected', async () => {
    component.selectedAssociation = component.associations[0];
    component.initializePageInfo();
    if (component.selectedAssociation.service?.getAssociations) {
      spyOn(component.selectedAssociation.service, 'getAssociations').and.returnValue(of(data));
    }
    fixture.detectChanges();

    component.getItems();

    expect(component.items).toEqual(data);
  });

  it('should get list of items when no association is selected', async () => {
    component.initializePageInfo();
    spyOn(component.dataService, 'getAll').and.returnValue(of(data));
    fixture.detectChanges();
    component.getItems();

    expect(component.items).toEqual(data);
  });

  it('should load more items onTableScroll when some association is selected', async () => {
    component.selectedAssociation = component.associations[0];
    component.initializePageInfo();
    component.isLoadingResults = false;
    if (component.selectedAssociation.service?.getAssociations) {
      spyOn(component.selectedAssociation.service, 'getAssociations').and.returnValue(of(data));
    }
    fixture.detectChanges();

    const itemsLength = component.items.length;
    component.onTableScroll();

    expect(component.items.length).toEqual(data.length + itemsLength);
  });

  it('should load more items onTableScroll when no association is selected', async () => {
    component.initializePageInfo();
    component.isLoadingResults = false;
    spyOn(component.dataService, 'getAll').and.returnValue(of(data));
    fixture.detectChanges();

    const itemsLength = component.items.length;
    component.onTableScroll();

    expect(component.items.length).toEqual(data.length + itemsLength);
  });

  it("should redirect to parent's details page if back is called", async () => {
    const router = TestBed.inject(Router);
    let navigationSpy = spyOn(router, 'navigate').and.callThrough();
    component.selectedAssociation = component.associations[0];
    component.selectedAssociation.associatedObj = parentData;
    fixture.detectChanges();

    component.back();

    let responsePromise = navigationSpy.calls.mostRecent().returnValue;
    await responsePromise;
    expect(router.navigate).toHaveBeenCalledWith([`/${component.selectedAssociation.table?.toLowerCase()}/1`]);
  });

  it('should set the association if foreign keys are passed as params', async () => {
    if (component.associations[0]?.service?.getById) {
      spyOn(component.associations[0].service, 'getById').and.returnValue(of(parentData));
    }
    component.checkForAssociations({ parentId: 1 });
    expect(component.selectedAssociation).toBe(component.associations[0]);
  });

  it('should be able to deactivate', async () => {
    expect(component.canDeactivate()).toBe(true);
  });

  it('should not be able to deactivate', async () => {
    await component.addNew();
    component.dialogRef = {
      ...Object.create(component.dialogRef),
      componentInstance: {
        itemForm: new FormBuilder().group({
          id: '',
        }),
      },
    };
    component.dialogRef.componentInstance.itemForm.markAsDirty();
    expect(component.canDeactivate()).toBe(false);
  });
});
