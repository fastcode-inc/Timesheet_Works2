import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { EntryComponents, TestingModule } from 'src/testing/utils';
import {
  CustomerExtendedService,
  CustomerDetailsExtendedComponent,
  CustomerListExtendedComponent,
  CustomerNewExtendedComponent,
} from '../';
import { ICustomer } from 'src/app/entities/customer';
import { ListFiltersComponent, ServiceUtils } from 'src/app/common/shared';
import { ListComponent, DetailsComponent, NewComponent, FieldsComp } from 'src/app/common/general-components';

describe('CustomerListExtendedComponent', () => {
  let fixture: ComponentFixture<CustomerListExtendedComponent>;
  let component: CustomerListExtendedComponent;
  let el: HTMLElement;

  describe('Unit tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [CustomerListExtendedComponent, ListComponent],
        imports: [TestingModule],
        providers: [CustomerExtendedService, ChangeDetectorRef],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CustomerListExtendedComponent,
          CustomerNewExtendedComponent,
          NewComponent,
          CustomerDetailsExtendedComponent,
          ListComponent,
          DetailsComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'customer', component: CustomerListExtendedComponent },
            { path: 'customer/:id', component: CustomerDetailsExtendedComponent },
          ]),
        ],
        providers: [CustomerExtendedService, ChangeDetectorRef],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerListExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
