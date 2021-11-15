import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { TimesheetdetailsExtendedService, TimesheetdetailsNewExtendedComponent } from '../';
import { ITimesheetdetails } from 'src/app/entities/timesheetdetails';
import { NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TimesheetdetailsNewExtendedComponent', () => {
  let component: TimesheetdetailsNewExtendedComponent;
  let fixture: ComponentFixture<TimesheetdetailsNewExtendedComponent>;

  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimesheetdetailsNewExtendedComponent, NewComponent, FieldsComp],
        imports: [TestingModule],
        providers: [TimesheetdetailsExtendedService, { provide: MAT_DIALOG_DATA, useValue: {} }],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimesheetdetailsNewExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    describe('', () => {
      beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [TimesheetdetailsNewExtendedComponent, NewComponent, FieldsComp].concat(EntryComponents),
          imports: [TestingModule],
          providers: [TimesheetdetailsExtendedService, { provide: MAT_DIALOG_DATA, useValue: {} }],
        });
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(TimesheetdetailsNewExtendedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
    });
  });
});
