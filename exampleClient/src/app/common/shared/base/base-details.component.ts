import { Component, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { GenericApiService } from './generic-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IAssociationEntry } from '../models/iassociationentry';

import { ISearchField, operatorType } from '../components/list-filters/ISearchCriteria';
import { IFCDialogConfig, PickerDialogService } from '../components/picker/picker-dialog.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { ErrorService } from 'src/app/core/services/error.service';
import { ServiceUtils } from '../utils/serviceUtils';
import { PickerComponent } from '../components/picker/picker.component';
import { Field } from '..';

@Component({
  template: '',
})
export class BaseDetailsComponent<E> implements OnInit, CanDeactivateGuard {
  /**
   * Guard against browser refresh, close, etc.
   * Checks if user has some unsaved changes
   * before leaving the page.
   */
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (this.itemForm.dirty && !this.submitted) {
      return false;
    }
    return true;
  }

  associations: IAssociationEntry[];
  childAssociations: IAssociationEntry[];
  parentAssociations: IAssociationEntry[];

  fields: Field[] = [];

  dialogRef: MatDialogRef<any>;
  pickerDialogRef: MatDialogRef<PickerComponent>;

  title: string = 'Title';
  item: E | any;
  parentUrl: string;
  idParam: any;
  itemForm: FormGroup;
  errorMessage = '';
  loading = false;
  submitted = false;

  entityName: string = '';
  IsReadPermission: Boolean = false;
  IsCreatePermission: Boolean = false;
  IsUpdatePermission: Boolean = false;
  IsDeletePermission: Boolean = false;
  globalPermissionService: GlobalPermissionService;

  isMediumDeviceOrLess: boolean;
  mediumDeviceOrLessDialogSize: string = '100%';
  largerDeviceDialogWidthSize: string = '65%';
  largerDeviceDialogHeightSize: string = '75%';

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
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
    this.setPermissions();
    this.idParam = this.route.snapshot.paramMap.get('id');
  }

  /**
   * Fetches item details from service
   */
  getItem(): any {
    if (this.idParam) {
      this.dataService.getById(this.idParam).subscribe(
        (x) => this.onItemFetched(x),
        (error) => {
          this.errorMessage = <any>error;
          this.errorService.showError('An error occured while fetching details');
        }
      );
    }
    return null;
  }

  onItemFetched(item: E) {
    this.item = item;
    this.itemForm.patchValue(item);
  }

  /**
   * Gets data from item form and calls
   * service method to update the item.
   */
  onSubmit(data: any) {
    if (this.itemForm.invalid) {
      return;
    }

    this.submitted = true;
    this.loading = true;
    this.dataService
      .update(data, this.idParam)
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.errorService.showError(`Item updated!`);
          //this.router.navigate([this.parentUrl], { relativeTo: this.route.parent });
        },
        (error) => {
          this.errorService.showError('Error Occured while updating');
          this.loading = false;
        }
      );
  }

  /**
   * Redirects back to entity list page.
   */
  onBack(): void {
    this.router.navigateByUrl('/' + this.parentUrl);
  }

  /**
   * Loads records of given association from service.
   * @param association
   */
  selectAssociation(association: IAssociationEntry) {
    let dialogConfig: IFCDialogConfig = <IFCDialogConfig>{
      Title: association.table,
      IsSingleSelection: true,
      DisplayField: association.referencedDescriptiveField,
    };

    // association.associatedObj = selectedParent;
    this.pickerDialogRef = this.pickerDialogService.open(dialogConfig);

    this.initializePickerPageInfo();
    association.service;
    association.service
      ?.getAll(this.searchValuePicker, this.currentPickerPage * this.pickerPageSize, this.pickerPageSize)
      .subscribe(
        (items) => {
          this.isLoadingPickerResults = false;
          this.pickerDialogRef.componentInstance.items = items;
          association.data = items;
          this.updatePickerPageInfo(items);
        },
        (error) => {
          this.errorMessage = <any>error;
          this.errorService.showError(this.errorMessage);
        }
      );

    this.pickerDialogRef.componentInstance.onScroll.subscribe((data) => {
      this.onPickerScroll(association);
    });

    this.pickerDialogRef.componentInstance.onSearch.subscribe((data) => {
      this.onPickerSearch(data, association);
    });

    this.pickerDialogRef.afterClosed().subscribe((associatedItem) => {
      this.onPickerClose(associatedItem, association);
    });
  }

  isLoadingPickerResults = true;

  currentPickerPage: number;
  pickerPageSize: number;
  lastProcessedOffsetPicker: number;
  hasMoreRecordsPicker: boolean;

  searchValuePicker: ISearchField[] = [];
  pickerItemsObservable: Observable<any>;

  /**
   * Initializes/Resets paging information of data list
   * of association showing in autocomplete options.
   */
  initializePickerPageInfo() {
    this.hasMoreRecordsPicker = true;
    this.pickerPageSize = 30;
    this.lastProcessedOffsetPicker = -1;
    this.currentPickerPage = 0;
    this.searchValuePicker = [];
  }

  /**
   * Manages paging for virtual scrolling for data list
   * of association showing in autocomplete options.
   * @param data Item data from the last service call.
   */
  updatePickerPageInfo(data: any) {
    if (data.length > 0) {
      this.currentPickerPage++;
      this.lastProcessedOffsetPicker += data.length;
    } else {
      this.hasMoreRecordsPicker = false;
    }
  }

  /**
   * Loads more data of given association when
   * list is scrolled to the bottom (virtual scrolling).
   * @param association
   */
  onPickerScroll(association: IAssociationEntry) {
    if (
      !this.isLoadingPickerResults &&
      this.hasMoreRecordsPicker &&
      this.lastProcessedOffsetPicker < association.data.length
    ) {
      this.isLoadingPickerResults = true;
      association.service;
      association.service
        ?.getAll(this.searchValuePicker, this.currentPickerPage * this.pickerPageSize, this.pickerPageSize)
        .subscribe(
          (items) => {
            this.isLoadingPickerResults = false;
            association.data = association.data.concat(items);
            this.pickerDialogRef.componentInstance.items = association.data;
            this.updatePickerPageInfo(items);
          },
          (error) => {
            this.errorMessage = <any>error;
            this.errorService.showError('An error occured while fetching more results');
          }
        );
    }
  }

  /**
   * Loads the data meeting given criteria of given association.
   * @param searchValue Filters to be applied.
   * @param association
   */
  onPickerSearch(searchValue: string, association: IAssociationEntry) {
    this.initializePickerPageInfo();
    let searchField: ISearchField = {
      fieldName: association.referencedDescriptiveField,
      operator: operatorType.Contains,
      searchValue: searchValue ? searchValue : '',
    };
    this.searchValuePicker = [searchField];

    association.service;
    association.service
      ?.getAll(this.searchValuePicker, this.currentPickerPage * this.pickerPageSize, this.pickerPageSize)
      .subscribe(
        (items) => {
          this.isLoadingPickerResults = false;
          this.pickerDialogRef.componentInstance.items = items;
          association.data = items;
          this.updatePickerPageInfo(items);
        },
        (error) => (this.errorMessage = <any>error)
      );
  }

  /**
   * Sets the join column values of associated parent in the form.
   * @param associatedItem selected parent object.
   * @param association
   */
  onPickerClose(associatedItem: any, association: IAssociationEntry) {
    if (associatedItem) {
      association.column?.forEach((col) => {
        this.itemForm.get(col.key)?.setValue(associatedItem[col.referencedkey]);
      });
      this.itemForm
        .get(association.descriptiveField)
        ?.setValue(
          association.referencedDescriptiveField ? associatedItem[association.referencedDescriptiveField] : null
        );
    }
  }

  /**
   * Gets query parameters passed in url
   * for given association.
   * @param association
   * @returns Object containing params as keys.
   */
  getQueryParams(association: IAssociationEntry) {
    let queryParam: any = {};
    association.column?.forEach((col) => {
      queryParam[col.key] = this.item[col.referencedkey];
    });
    return queryParam;
  }

  /**
   * Redirects to the list(if relationship is oneToMany) or
   * details(if oneToOne) page of given association.
   * @param association
   */
  openChildDetails(association: IAssociationEntry) {
    if (association.type == 'OneToMany') {
      this.router.navigate(['/' + association.table?.toLowerCase()], { queryParams: this.getQueryParams(association) });
    } else if (association.type == 'OneToOne') {
      if (association.table) {
        this.dataService.getChild(association.table, this.idParam).subscribe(
          (childObj) => {
            this.router.navigate([
              '/' +
                association.table?.toLowerCase() +
                '/' +
                ServiceUtils.encodeIdByObject(childObj, association.associatedPrimaryKeys as []),
            ]);
          },
          (error) => {
            this.errorMessage = <any>error;
            this.errorService.showError('An error occured while redirecting');
          }
        );
      }
    }
  }

  downloadFile(fieldName: string) {
    this.dataService.downloadFile(this.idParam, fieldName).subscribe((res: Blob) => {
      res = res.slice(0, res.size, 'application/octet-stream');
      var a = document.createElement('a'),
        url = URL.createObjectURL(res);
      a.href = url;
      a.download = fieldName;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    });
  }
}
