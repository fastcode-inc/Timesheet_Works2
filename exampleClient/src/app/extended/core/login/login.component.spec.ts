import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginExtendedComponent } from './login.component';
import { TestingModule, EntryComponents } from 'src/testing/utils';
import { ILogin } from 'src/app/core/login/ilogin';
import { DebugElement } from '@angular/core';

describe('LoginExtendedComponent', () => {
  let component: LoginExtendedComponent;
  let fixture: ComponentFixture<LoginExtendedComponent>;
  let data: ILogin = {
    userName: 'userName1',
    password: 'password1',
  };
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginExtendedComponent].concat(EntryComponents),
      imports: [TestingModule],
      providers: [{ provide: MatDialogRef, useValue: { close: (dialogResult: any) => {} } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
