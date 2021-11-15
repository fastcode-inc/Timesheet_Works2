import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  RolepermissionExtendedService,
  RolepermissionDetailsExtendedComponent,
  RolepermissionListExtendedComponent,
  RolepermissionNewExtendedComponent,
} from '../';
import { IRolepermission } from 'src/app/admin/user-management/rolepermission';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('RolepermissionListExtendedComponent', () => {
  let fixture: ComponentFixture<RolepermissionListExtendedComponent>;
  let component: RolepermissionListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RolepermissionListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [RolepermissionExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RolepermissionListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          RolepermissionListExtendedComponent,
          RolepermissionNewExtendedComponent,
          NewComponent,
          RolepermissionDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'rolepermission', component: RolepermissionListExtendedComponent },
            { path: 'rolepermission/:id', component: RolepermissionDetailsExtendedComponent },
          ]),
        ],
        providers: [RolepermissionExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RolepermissionListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
