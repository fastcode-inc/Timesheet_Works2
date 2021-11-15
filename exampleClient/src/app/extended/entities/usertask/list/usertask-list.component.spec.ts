import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  UsertaskExtendedService,
  UsertaskDetailsExtendedComponent,
  UsertaskListExtendedComponent,
  UsertaskNewExtendedComponent,
} from '../';
import { IUsertask } from 'src/app/entities/usertask';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('UsertaskListExtendedComponent', () => {
  let fixture: ComponentFixture<UsertaskListExtendedComponent>;
  let component: UsertaskListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UsertaskListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [UsertaskExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsertaskListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UsertaskListExtendedComponent,
          UsertaskNewExtendedComponent,
          NewComponent,
          UsertaskDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'usertask', component: UsertaskListExtendedComponent },
            { path: 'usertask/:id', component: UsertaskDetailsExtendedComponent },
          ]),
        ],
        providers: [UsertaskExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsertaskListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
