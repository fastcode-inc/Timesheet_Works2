import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericApiService } from './generic-api.service';

import { Router, ActivatedRoute } from '@angular/router';
import { IListColumn } from '../models/ilistColumn';
import { IAssociationEntry } from '../models/iassociationentry';
import { PickerDialogService } from '../components/picker/picker-dialog.service';

import { of as observableOf, Observable } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ISearchField } from '../components/list-filters/ISearchCriteria';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { ServiceUtils } from '../utils/serviceUtils';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ListComponent } from 'src/app/common/general-components';
import { Globals } from 'src/app/core/services/globals';
import { MatSort } from '@angular/material/sort';

export enum listProcessingType {
  Replace = 'Replace',
  Append = 'Append',
}

@Component({
  selector: 'app-base-list',
  template: '',
})
export class BaseListComponent<E> implements OnInit {
  defaultDateFormat: string = 'mediumDate';
  defaultDateTimeFormat: string = 'medium';
  associations: IAssociationEntry[];
  selectedAssociation: IAssociationEntry;

  @ViewChild(ListComponent, { static: true }) generalListComp: any;
  sort: MatSort;

  title = 'title';
  entityName = '';
  primaryKeys: string[] = [];
  items: E[] = [];
  itemsObservable: Observable<E[]>;
  errorMessage = '';
  columns: IListColumn[] = [];

  selectedColumns: IListColumn[] = [];
  displayedColumns: string[] = [];
  IsReadPermission: Boolean = false;
  IsCreatePermission: Boolean = false;
  IsUpdatePermission: Boolean = false;
  IsDeletePermission: Boolean = false;
  globalPermissionService: GlobalPermissionService;

  isMediumDeviceOrLess: boolean;
  dialogRef: MatDialogRef<any>;
  deleteDialogRef: MatDialogRef<ConfirmDialogComponent>;
  mediumDeviceOrLessDialogSize: string = '100%';
  largerDeviceDialogWidthSize: string = '85%';
  largerDeviceDialogHeightSize: string = '85%';
  url: string;

  /**
   * Guard against browser refresh, close, etc.
   * Checks if user has some unsaved changes
   * before leaving the page.
   */
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (
      this.dialogRef &&
      this.dialogRef.componentInstance &&
      this.dialogRef.componentInstance.itemForm.dirty &&
      !this.dialogRef.componentInstance.submitted
    ) {
      return false;
    }
    return true;
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public global: Globals,
    public changeDetectorRefs: ChangeDetectorRef,
    public pickerDialogService: PickerDialogService,
    public dataService: GenericApiService<E>,
    public errorService: ErrorService
  ) {}

  /**
   * Sets CRUD permissions for entity for
   * currently logged in user.
   */
  setPermissions = () => {
    if (this.globalPermissionService) {
      let entityName = this.entityName.startsWith('I') ? this.entityName.substr(1) : this.entityName;
      this.IsCreatePermission = this.globalPermissionService.hasPermissionOnEntity(entityName, 'CREATE');
      if (this.IsCreatePermission) {
        this.IsReadPermission = true;
        this.IsDeletePermission = true;
        this.IsUpdatePermission = true;
      } else {
        this.IsDeletePermission = this.globalPermissionService.hasPermissionOnEntity(entityName, 'DELETE');
        this.IsUpdatePermission = this.globalPermissionService.hasPermissionOnEntity(entityName, 'UPDATE');
        this.IsReadPermission =
          this.IsDeletePermission || this.IsUpdatePermission
            ? true
            : this.globalPermissionService.hasPermissionOnEntity(entityName, 'READ');
      }
    }
  };

  ngOnInit() {
    if (this.generalListComp) {
      this.sort = this.generalListComp.sort;
    }
    this.url = this.dataService.suffix.toLowerCase();
    this.setPermissions();
    this.manageScreenResizing();
    this.checkForAssociations(this.route.snapshot.queryParams);
    this.setSort();
  }

  /**
   * Adds a listener to sort value change event to
   * load item data.
   * also gets triggered on component initialization.
   */
  setSort() {
    this.sort.sortChange
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.initializePageInfo();
          let sortVal = this.getSortValue();
          let result: any = [];
          if (
            this.selectedAssociation !== undefined &&
            this.selectedAssociation.column &&
            this.selectedAssociation.column.length > 0
          ) {
            result = this.selectedAssociation.service?.getAssociations(
              this.selectedAssociation.url,
              ServiceUtils.encodeId(this.selectedAssociation.column),
              this.searchValue,
              this.currentPage * this.pageSize,
              this.pageSize,
              sortVal
            );

            // fetch filtered data based on selected association
          } else {
            result = this.dataService.getAll(
              this.searchValue,
              this.currentPage * this.pageSize,
              this.pageSize,
              sortVal
            );
          }
          return result as [];
        }),
        map((data) => {
          this.isLoadingResults = false;
          return data;
        }),
        catchError((err) => {
          this.isLoadingResults = false;
          this.errorService.showError('An error occured while fetching results');
          return observableOf([]);
        })
      )
      .subscribe((data: any[]) => {
        this.items = data;
        this.updatePageInfo(data);
      });
  }

  /**
   * Manages screen resizing for responsiveness.
   */
  manageScreenResizing() {
    this.global.isMediumDeviceOrLess$.subscribe((value) => {
      this.isMediumDeviceOrLess = value;
      if (value) {
        this.selectedColumns = this.columns;
        this.selectedColumns = this.selectedColumns.slice(0, 3);
        if (this.columns.length > 3) {
          this.selectedColumns.push(this.columns[this.columns.length - 1]);
        }
        this.displayedColumns = this.selectedColumns.map((obj, index) => {
          return obj.column;
        });
      } else {
        this.selectedColumns = this.columns;
        this.displayedColumns = this.selectedColumns.map((obj) => {
          return obj.column;
        });
      }
      if (this.dialogRef)
        this.dialogRef.updateSize(
          value ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogWidthSize,
          value ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogHeightSize
        );
    });
  }

  /**
   * Fetches item data from service.
   */
  getItems() {
    this.isLoadingResults = true;
    this.initializePageInfo();
    let sortVal = this.getSortValue();
    if (this.selectedAssociation.service && this.selectedAssociation.column.length > 0) {
      this.itemsObservable = this.selectedAssociation.service?.getAssociations(
        this.selectedAssociation.url,
        ServiceUtils.encodeId(this.selectedAssociation.column),
        this.searchValue,
        this.currentPage * this.pageSize,
        this.pageSize,
        sortVal
      ); // fetch filtered data based on selected association
    } else {
      this.itemsObservable = this.dataService.getAll(
        this.searchValue,
        this.currentPage * this.pageSize,
        this.pageSize,
        sortVal
      );
    }
    if (this.itemsObservable) {
      this.processListObservable(this.itemsObservable, listProcessingType.Replace);
    }
  }

  /**
   * Opens a modal dialog containing the given component.
   * @param component - type of component to load into dialog.
   * @param data data to pass to dialog instance.
   */
  openDialog(component: any, data: any) {
    this.dialogRef = this.dialog.open(component, {
      disableClose: true,
      height: this.isMediumDeviceOrLess ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogHeightSize,
      width: this.isMediumDeviceOrLess ? this.mediumDeviceOrLessDialogSize : this.largerDeviceDialogWidthSize,
      maxWidth: 'none',
      panelClass: 'fc-modal-dialog',
      data: data,
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.errorService.showError(`Item created!`);
        this.getItems();
      }
    });
  }

  /**
   * Opens a modal dialog to create new entry
   * containing the given component.
   * @param component - type of component to load into dialog.
   */
  addNew(component: any) {
    if (!this.selectedAssociation) {
      this.openDialog(component, null);
      return;
    } else {
      let data: any = {};
      this.selectedAssociation.column?.forEach((col) => {
        data[col.key] = col.value;
      });
      if (this.selectedAssociation.referencedDescriptiveField) {
        data[this.selectedAssociation.descriptiveField] = this.selectedAssociation.associatedObj[
          this.selectedAssociation.referencedDescriptiveField
        ];
      }
      this.openDialog(component, data);
      return;
    }
  }

  /**
   * Fetches item data based on given filter criteria.
   * @param filterCriteria Filters to be applied.
   */
  applyFilter(filterCriteria: ISearchField[]): void {
    this.searchValue = filterCriteria;
    this.isLoadingResults = true;
    this.initializePageInfo();
    let sortVal = this.getSortValue();
    if (this.selectedAssociation.service && this.selectedAssociation.column.length > 0) {
      this.itemsObservable = this.selectedAssociation.service?.getAssociations(
        this.selectedAssociation.url,
        ServiceUtils.encodeId(this.selectedAssociation.column),
        this.searchValue,
        this.currentPage * this.pageSize,
        this.pageSize,
        sortVal
      );
    } else {
      this.itemsObservable = this.dataService.getAll(
        this.searchValue,
        this.currentPage * this.pageSize,
        this.pageSize,
        sortVal
      );
    }
    if (this.itemsObservable) {
      this.processListObservable(this.itemsObservable, listProcessingType.Replace);
    }
  }

  /**
   * Checks if parameter for some association is passed,
   * fetches object details against that association and
   * sets selectedAssociation.
   * @param params Map of query params to check if some association column is there.
   */
  checkForAssociations(params: any) {
    this.selectedAssociation = { column: [] };
    this.associations.forEach((association: any, associationIndex: any) => {
      let matchedColumns = 0;
      let totalCount = association.column?.length;
      association.column?.forEach((col: any, columnIndex: any) => {
        const columnValue = params[col.key];
        if (columnValue) {
          this.associations[associationIndex].column[columnIndex].value = columnValue;
          matchedColumns++;
        }
      });
      if (matchedColumns == totalCount) {
        this.selectedAssociation = association;
        this.selectedColumns.splice(
          this.selectedColumns.findIndex((item) => item.column == association.descriptiveField),
          1
        );
        this.displayedColumns.splice(
          this.displayedColumns.findIndex((item) => item == association.descriptiveField),
          1
        );
        if (this.selectedAssociation.column) {
          this.selectedAssociation.service
            ?.getById(ServiceUtils.encodeId(this.selectedAssociation.column))
            .subscribe((parentObj) => {
              this.selectedAssociation.associatedObj = parentObj;
            });
        }
        return;
      }
    });
  }

  /**
   * Calls service method to delete item.
   * @param item Item to be deleted.
   */
  deleteItem(item: E) {
    let id = ServiceUtils.encodeIdByObject(item, this.primaryKeys);
    this.dataService.delete(id).subscribe((result) => {
      let r = result;
      const index: number = this.items.findIndex((x) => ServiceUtils.encodeIdByObject(x, this.primaryKeys) == id);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.items = [...this.items];
        this.changeDetectorRefs.detectChanges();
        this.errorService.showError('Item deleted');
      }
    });
  }

  /**
   * Prompts user to confirm delete action.
   * @param item Item to be deleted.
   */
  delete(item: E): void {
    this.deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      data: {
        confirmationType: 'delete',
      },
    });

    this.deleteDialogRef.afterClosed().subscribe((action) => {
      if (action) {
        this.deleteItem(item);
      }
    });
  }

  /**
   * Redirects to details page of given item.
   * @param item
   */
  openDetails(item: E) {
    this.router.navigate([`${this.url}/${ServiceUtils.encodeIdByObject(item, this.primaryKeys)}`]);
  }

  /**
   * Redirects back to the details page of selected association.
   */
  back() {
    let parentPrimaryKeys = this.selectedAssociation.column?.map((c) => c.referencedkey);
    let paramString;
    if (parentPrimaryKeys) {
      paramString = ServiceUtils.encodeIdByObject(this.selectedAssociation.associatedObj, parentPrimaryKeys);
    }
    this.router.navigate([`/${this.selectedAssociation.table?.toLowerCase()}/${paramString}`]);
  }

  isLoadingResults = false;

  currentPage: number;
  pageSize: number;
  lastProcessedOffset: number;
  hasMoreRecords: boolean;
  searchValue: ISearchField[] = [];

  /**
   * Initializes/Resets paging information.
   */
  initializePageInfo() {
    this.hasMoreRecords = true;
    this.pageSize = 30;
    this.lastProcessedOffset = -1;
    this.currentPage = 0;
  }

  /**
   * Manages paging for virtual scrolling.
   * @param data Item data from the last service call.
   */
  updatePageInfo(data: any) {
    if (data.length > 0) {
      this.currentPage++;
      this.lastProcessedOffset += data.length;
    } else {
      this.hasMoreRecords = false;
    }
  }

  /**
   * Loads more item data when list is
   * scrolled to the bottom (virtual scrolling).
   */
  onTableScroll() {
    if (!this.isLoadingResults && this.hasMoreRecords && this.lastProcessedOffset < this.items.length) {
      this.isLoadingResults = true;
      let sortVal = this.getSortValue();
      if (this.selectedAssociation.service && this.selectedAssociation.column.length > 0) {
        this.itemsObservable = this.selectedAssociation.service?.getAssociations(
          this.selectedAssociation.url,
          ServiceUtils.encodeId(this.selectedAssociation.column),
          this.searchValue,
          this.currentPage * this.pageSize,
          this.pageSize,
          sortVal
        );
      } else {
        this.itemsObservable = this.dataService.getAll(
          this.searchValue,
          this.currentPage * this.pageSize,
          this.pageSize,
          sortVal
        );
      }
      if (this.itemsObservable) {
        this.processListObservable(this.itemsObservable, listProcessingType.Append);
      }
    }
  }

  /**
   * Gets field based on which table is
   * currently sorted and sort direction
   * from matSort.
   * @returns String containing sort information.
   */
  getSortValue(): string {
    let sortVal = '';
    if (this.sort.active && this.sort.direction) {
      sortVal = this.sort.active + ',' + this.sort.direction;
    }
    return sortVal;
  }

  /**
   * Processes observable response data gotten from the service.
   * @param listObservable observable item data.
   * @param type processing type to determine whether to append to
   * or replace existing item data.
   */
  processListObservable(listObservable: Observable<E[]>, type: listProcessingType) {
    listObservable.subscribe(
      (items: any) => {
        this.isLoadingResults = false;
        if (type == listProcessingType.Replace) {
          this.items = items;
        } else {
          this.items = this.items.concat(items);
        }
        this.updatePageInfo(items);
      },
      (error) => {
        this.isLoadingResults = false;
        this.errorMessage = <any>error;
        this.errorService.showError('An error occured while fetching results');
      }
    );
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

  /**
   * Checks whether the table is sortable based on a given column.
   * @param columnDef Column to be checked.
   * @returns Boolean flag.
   */
  isColumnSortable(columnDef: string) {
    return this.columns.find((x) => x.column == columnDef)?.sort;
  }
}
