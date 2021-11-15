import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { of, Observable } from 'rxjs';
import { Router, ActivatedRoute, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { TestingModule, EntryComponents } from 'src/testing/utils';
import { ILogin } from './ilogin';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardExtendedComponent } from 'src/app/extended/core/dashboard';
import { LoginExtendedComponent } from 'src/app/extended/core/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let router: Router;
  let aroutes: ActivatedRoute;
  let navigationSpy: any;
  let fixture: ComponentFixture<LoginComponent>;
  let data: ILogin = {
    userName: 'userName1',
    password: 'password1',
  };
  let el: DebugElement;
  const routes: Routes = [
    { path: '', component: LoginExtendedComponent, pathMatch: 'full' },
    { path: 'login', component: LoginExtendedComponent },
    { path: 'login/:returnUrl', component: LoginExtendedComponent },
    { path: 'dashboard', component: DashboardExtendedComponent, canActivate: [AuthGuard] },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent].concat(EntryComponents),
      imports: [TestingModule, RouterTestingModule.withRoutes(routes)], //, RouterTestingModule.withRoutes([{path: 'some/path',component: dummy}])]
      providers: [
        AuthGuard,
        { provide: MatDialogRef, useValue: { close: (dialogResult: any) => {} } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: {} },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    aroutes = TestBed.inject(ActivatedRoute);
    navigationSpy = spyOn(router, 'navigate').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to returnUrl if a valid token exists', async () => {
    spyOn(component.authenticationService, 'isTokenExpired').and.returnValue(false);
    aroutes.snapshot.queryParams['returnUrl'] = 'dashboard';
    fixture.detectChanges();
    component.ngOnInit();

    let responsePromise = navigationSpy.calls.mostRecent().returnValue;
    await responsePromise;

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should navigate dashboard if no redirect url is provided and a valid token exists', async () => {
    spyOn(component.authenticationService, 'isTokenExpired').and.returnValue(false);

    component.ngOnInit();

    let responsePromise = navigationSpy.calls.mostRecent().returnValue;
    await responsePromise;

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should call logout initialize form if token is invalid', async () => {
    spyOn(component.authenticationService, 'decodeToken').and.returnValue({ sub: 'sub1' });
    spyOn(component.authenticationService, 'isTokenExpired').and.returnValue(true);
    spyOn(component.authenticationService, 'logout').and.returnValue();

    component.ngOnInit();

    expect(component.authenticationService.logout).toHaveBeenCalled();
    expect(component.itemForm).toBeDefined();
  });

  it('initialize form if token is present', async () => {
    spyOn(component.authenticationService, 'decodeToken').and.callThrough();
    component.ngOnInit();
    expect(component.itemForm).toBeDefined();
  });

  it('should run #onSubmit()', async () => {
    component.itemForm.patchValue(data);
    component.itemForm.enable();
    fixture.detectChanges();
    spyOn(component.authenticationService, 'login').withArgs(data).and.returnValue(of({}));
    el = fixture.debugElement.query(By.css('button[name=login]'));
    el.nativeElement.click();
    expect(component.authenticationService.login).toHaveBeenCalledWith(data);
  });

  it('should navigate to returnUrl in case of successful authentication', async () => {
    component.returnUrl = 'dashboard';
    fixture.detectChanges();

    component.itemForm.patchValue(data);
    component.itemForm.enable();
    fixture.detectChanges();
    spyOn(component.authenticationService, 'login').withArgs(data).and.returnValue(of({}));
    el = fixture.debugElement.query(By.css('button[name=login]'));
    el.nativeElement.click();

    let responsePromise = navigationSpy.calls.mostRecent().returnValue;
    await responsePromise;

    expect(component.router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should have set passwordUserNameError in form in case of error in authentication', async () => {
    component.itemForm.patchValue(data);
    component.itemForm.enable();
    fixture.detectChanges();
    spyOn(component.authenticationService, 'login')
      .withArgs(data)
      .and.returnValue(
        Observable.create((observer: any) => {
          observer.error(new Error('invalid username or password'));
        })
      );

    el = fixture.debugElement.query(By.css('button[name=login]'));
    el.nativeElement.click();
    expect(component.itemForm.getError('passwordUserNameError')).toBeDefined();
  });

  // it('login button should be disable when form is not valid', async () => {

  //   fixture.detectChanges();
  //   spyOn(component.authenticationService, 'login').withArgs(data).and.returnValue(of({}));
  //   el = fixture.debugElement.query(By.css('button[name=login]'));
  //   expect(el.nativeElement.disabled).toBe(true);

  // });
});
