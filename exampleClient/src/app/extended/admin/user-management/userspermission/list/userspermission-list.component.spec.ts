import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  UserspermissionExtendedService,
  UserspermissionDetailsExtendedComponent,
  UserspermissionListExtendedComponent,
  UserspermissionNewExtendedComponent,
} from '../';
import { IUserspermission } from 'src/app/admin/user-management/userspermission';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('UserspermissionListExtendedComponent', () => {
  let fixture: ComponentFixture<UserspermissionListExtendedComponent>;
  let component: UserspermissionListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UserspermissionListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [UserspermissionExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserspermissionListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UserspermissionListExtendedComponent,
          UserspermissionNewExtendedComponent,
          NewComponent,
          UserspermissionDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'userspermission', component: UserspermissionListExtendedComponent },
            { path: 'userspermission/:id', component: UserspermissionDetailsExtendedComponent },
          ]),
        ],
        providers: [UserspermissionExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UserspermissionListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
