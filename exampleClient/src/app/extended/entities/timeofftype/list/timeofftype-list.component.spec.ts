import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  TimeofftypeExtendedService,
  TimeofftypeDetailsExtendedComponent,
  TimeofftypeListExtendedComponent,
  TimeofftypeNewExtendedComponent,
} from '../';
import { ITimeofftype } from 'src/app/entities/timeofftype';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('TimeofftypeListExtendedComponent', () => {
  let fixture: ComponentFixture<TimeofftypeListExtendedComponent>;
  let component: TimeofftypeListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [TimeofftypeListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [TimeofftypeExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeofftypeListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          TimeofftypeListExtendedComponent,
          TimeofftypeNewExtendedComponent,
          NewComponent,
          TimeofftypeDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'timeofftype', component: TimeofftypeListExtendedComponent },
            { path: 'timeofftype/:id', component: TimeofftypeDetailsExtendedComponent },
          ]),
        ],
        providers: [TimeofftypeExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TimeofftypeListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
