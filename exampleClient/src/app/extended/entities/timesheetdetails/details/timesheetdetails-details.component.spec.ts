import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import {
  TimesheetdetailsExtendedService,
  TimesheetdetailsDetailsExtendedComponent,
  TimesheetdetailsListExtendedComponent,
} from '../';
import { ITimesheetdetails } from 'src/app/entities/timesheetdetails';
describe('TimesheetdetailsDetailsExtendedComponent', () => {
  let component: TimesheetdetailsDetailsExtendedComponent;
  let fixture: ComponentFixture<TimesheetdetailsDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetdetailsDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [TimesheetdetailsExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetdetailsDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimesheetdetailsDetailsExtendedComponent,
          TimesheetdetailsListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timesheetdetails', component: TimesheetdetailsDetailsExtendedComponent },
            { path: 'timesheetdetails/:id', component: TimesheetdetailsListExtendedComponent },
          ]),
        ],
        providers: [TimesheetdetailsExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetdetailsDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
