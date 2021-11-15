import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import {
  RolepermissionExtendedService,
  RolepermissionDetailsExtendedComponent,
  RolepermissionListExtendedComponent,
} from '../';
import { IRolepermission } from 'src/app/admin/user-management/rolepermission';
describe('RolepermissionDetailsExtendedComponent', () => {
  let component: RolepermissionDetailsExtendedComponent;
  let fixture: ComponentFixture<RolepermissionDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [RolepermissionDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [RolepermissionExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RolepermissionDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          RolepermissionDetailsExtendedComponent,
          RolepermissionListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'rolepermission', component: RolepermissionDetailsExtendedComponent },
            { path: 'rolepermission/:id', component: RolepermissionListExtendedComponent },
          ]),
        ],
        providers: [RolepermissionExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(RolepermissionDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
