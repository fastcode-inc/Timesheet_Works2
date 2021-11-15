import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  TimesheetstatusExtendedService,
  TimesheetstatusDetailsExtendedComponent,
  TimesheetstatusListExtendedComponent,
  TimesheetstatusNewExtendedComponent,
} from '../';
import { ITimesheetstatus } from 'src/app/entities/timesheetstatus';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TimesheetstatusListExtendedComponent', () => {
  let fixture: ComponentFixture<TimesheetstatusListExtendedComponent>;
  let component: TimesheetstatusListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetstatusListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [TimesheetstatusExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetstatusListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimesheetstatusListExtendedComponent,
          TimesheetstatusNewExtendedComponent,
          NewComponent,
          TimesheetstatusDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timesheetstatus', component: TimesheetstatusListExtendedComponent },
            { path: 'timesheetstatus/:id', component: TimesheetstatusDetailsExtendedComponent },
          ]),
        ],
        providers: [TimesheetstatusExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetstatusListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
