import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DetailsComponent, ListComponent, FieldsComp } from 'src/app/common/general-components';

import { TestingModule, EntryComponents } from 'src/testing/utils';
import { UsertaskExtendedService, UsertaskDetailsExtendedComponent, UsertaskListExtendedComponent } from '../';
import { IUsertask } from 'src/app/entities/usertask';
describe('UsertaskDetailsExtendedComponent', () => {
  let component: UsertaskDetailsExtendedComponent;
  let fixture: ComponentFixture<UsertaskDetailsExtendedComponent>;
  let el: HTMLElement;

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UsertaskDetailsExtendedComponent, DetailsComponent],
        imports: [TestingModule],
        providers: [UsertaskExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsertaskDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });

  describe('Integration Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          UsertaskDetailsExtendedComponent,
          UsertaskListExtendedComponent,
          DetailsComponent,
          ListComponent,
          FieldsComp,
        ].concat(EntryComponents),
        imports: [
          TestingModule,
          RouterTestingModule.withRoutes([
            { path: 'usertask', component: UsertaskDetailsExtendedComponent },
            { path: 'usertask/:id', component: UsertaskListExtendedComponent },
          ]),
        ],
        providers: [UsertaskExtendedService],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UsertaskDetailsExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
