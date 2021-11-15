import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { CustomerExtendedService, CustomerDetailsExtendedComponent, CustomerListExtendedComponent } from '../';
import { ICustomer } from 'src/app/entities/customer';
describe('CustomerDetailsExtendedComponent', () => {
  let component: CustomerDetailsExtendedComponent;
  let fixture: ComponentFixture<CustomerDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [CustomerDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [CustomerExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CustomerDetailsExtendedComponent,
          CustomerListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'customer', component: CustomerDetailsExtendedComponent },
            { path: 'customer/:id', component: CustomerListExtendedComponent },
          ]),
        ],
        providers: [CustomerExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CustomerDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
