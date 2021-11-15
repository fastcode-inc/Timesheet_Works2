import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  PickerDialogService,
  PickerComponent,
  ListFiltersComponent,
  ConfirmDialogComponent,
  ToolTipRendererDirective,
} from 'src/app/common/shared';

import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TranslateTestingModule } from './translate-testing.module';
import {
  ActivatedRouteMock,
  GlobalsMock,
  AuthenticationServiceMock,
  GlobalPermissionServiceMock,
  MatDialogMock,
  MatDialogRefMock,
} from './mocks';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { Globals } from 'src/app/core/services/globals';

export var EntryComponents: any[] = [
  PickerComponent,
  ListFiltersComponent,
  ConfirmDialogComponent,
  ToolTipRendererDirective,
];

export var imports: any[] = [
  HttpClientTestingModule,
  NoopAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatTableModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatChipsModule,
  MatSortModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  NgxMaterialTimepickerModule,
  TranslateTestingModule,
  MatTooltipModule,
  RouterTestingModule,
];

export var exports: any[] = [
  HttpClientTestingModule,
  NoopAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatTableModule,
  MatCardModule,
  MatTabsModule,
  MatInputModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatTable,
  MatChipsModule,
  MatSortModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  NgxMaterialTimepickerModule,
  TranslateTestingModule,
  MatTooltipModule,
  RouterTestingModule,
];

export var providers: any[] = [
  // {provide: Router, useClass: MockRouter},
  { provide: ActivatedRoute, useValue: ActivatedRouteMock },
  { provide: Globals, useValue: GlobalsMock },
  // MatDialog,
  // {provide: PickerDialogService, useClass: MockPickerDialogService},
  { provide: AuthenticationService, useClass: AuthenticationServiceMock },
  { provide: GlobalPermissionService, useClass: GlobalPermissionServiceMock },
  { provide: MatDialog, useClass: MatDialogMock },
  { provide: MatDialogRef, useValue: MatDialogRefMock },
  PickerDialogService,
];

@NgModule({
  imports: imports,
  exports: exports,
  providers: providers,
})
export class TestingModule {
  constructor() {}
}

export function checkValues(mainObject: any, objToBeChecked: any): boolean {
  const doesValueMatch = (currentKey: string) => {
    return mainObject[currentKey] == objToBeChecked[currentKey];
  };
  return Object.keys(objToBeChecked).every(doesValueMatch);
}
