import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  TimesheetdetailsExtendedService,
  TimesheetdetailsDetailsExtendedComponent,
  TimesheetdetailsListExtendedComponent,
  TimesheetdetailsNewExtendedComponent,
} from '../';
import { ITimesheetdetails } from 'src/app/entities/timesheetdetails';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TimesheetdetailsListExtendedComponent', () => {
  let fixture: ComponentFixture<TimesheetdetailsListExtendedComponent>;
  let component: TimesheetdetailsListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetdetailsListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [TimesheetdetailsExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetdetailsListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimesheetdetailsListExtendedComponent,
          TimesheetdetailsNewExtendedComponent,
          NewComponent,
          TimesheetdetailsDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timesheetdetails', component: TimesheetdetailsListExtendedComponent },
            { path: 'timesheetdetails/:id', component: TimesheetdetailsDetailsExtendedComponent },
          ]),
        ],
        providers: [TimesheetdetailsExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetdetailsListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
