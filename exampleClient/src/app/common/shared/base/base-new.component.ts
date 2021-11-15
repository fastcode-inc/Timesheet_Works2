import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { GenericApiService } from './generic-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Field } from '..';

import { IAssociationEntry } from '../models/iassociationentry';
import { IFCDialogConfig, PickerDialogService } from '../components/picker/picker-dialog.service';
import { ISearchField, operatorType } from '../components/list-filters/ISearchCriteria';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';

import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { ErrorService } from 'src/app/core/services/error.service';
import { Globals } from 'src/app/core/services/globals';
@Component({
  template: '',
})
export class BaseNewComponent<E> implements OnInit, CanDeactivateGuard {
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (this.itemForm.touched) {
      return false;
    }
    return true;
  }

  itemForm: FormGroup;
  loading = false;
  submitted = false;
  title: string = 'title';

  pickerDialogRef: MatDialogRef<any>;

  associations: IAssociationEntry[];
  parentAssociations: IAssociationEntry[];
  fields: Field[] = [];

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

  errorMessage = '';

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public pickerDialogService: PickerDialogService,
    public dataService: GenericApiService<E>,
    public errorService: ErrorService
  ) {}

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
    //});
  };
  ngOnInit() {
    this.setPermissions();
  }

  onSubmit(data: any) {
    // stop here if form is invalid
    if (this.itemForm.invalid) {
      return;
    }

    this.submitted = true;
    this.loading = true;
    this.dataService
      .create(data)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.alertService.success('Registration successful', true);
          // this.router.navigate(['/users']);
          this.dialogRef.close(data);
        },
        (error) => {
          this.errorService.showError('Error Occured while creating');
          this.loading = false;
          this.dialogRef.close(null);
        }
      );
  }
  onCancel(): void {
    this.dialogRef.close(null);
  }

  selectAssociation(association: IAssociationEntry) {
    let dialogConfig: IFCDialogConfig = <IFCDialogConfig>{
      Title: association.table,
      IsSingleSelection: true,
      DisplayField: association.referencedDescriptiveField,
    };

    this.pickerDialogRef = this.pickerDialogService.open(dialogConfig);

    this.initializePickerPageInfo();
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

    this.pickerDialogRef.componentInstance.onScroll.subscribe((data: any) => {
      this.onPickerScroll(association);
    });

    this.pickerDialogRef.componentInstance.onSearch.subscribe((data: any) => {
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

  initializePickerPageInfo() {
    this.hasMoreRecordsPicker = true;
    this.pickerPageSize = 30;
    this.lastProcessedOffsetPicker = -1;
    this.currentPickerPage = 0;
    this.searchValuePicker = [];
  }

  //manage pages for virtual scrolling
  updatePickerPageInfo(data: any) {
    if (data.length > 0) {
      this.currentPickerPage++;
      this.lastProcessedOffsetPicker += data.length;
    } else {
      this.hasMoreRecordsPicker = false;
    }
  }

  onPickerScroll(association: IAssociationEntry) {
    if (
      !this.isLoadingPickerResults &&
      this.hasMoreRecordsPicker &&
      this.lastProcessedOffsetPicker < association.data.length
    ) {
      this.isLoadingPickerResults = true;
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

  onPickerSearch(searchValue: string, association: IAssociationEntry) {
    this.initializePickerPageInfo();
    let searchField: ISearchField = {
      fieldName: association.referencedDescriptiveField,
      operator: operatorType.Contains,
      searchValue: searchValue ? searchValue : '',
    };
    this.searchValuePicker = [searchField];

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
      if (association.referencedDescriptiveField) {
        this.itemForm
          .get(association.descriptiveField)
          ?.setValue(associatedItem[association.referencedDescriptiveField]);
      }
    }
  }

  checkPassedData() {
    if (this.data) {
      this.itemForm.patchValue(this.data);
    }
  }
}
