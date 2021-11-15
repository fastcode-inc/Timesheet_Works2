import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatExpansionModule } from '@angular/material/expansion';
import { MainNavComponent } from './main-nav.component';
import { TestingModule, EntryComponents } from 'src/testing/utils';

import { UsersService } from 'src/app/admin/user-management/users';
import { of } from 'rxjs';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardExtendedComponent } from 'src/app/extended/core/dashboard';
import { LoginExtendedComponent } from 'src/app/extended/core/login/login.component';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../guards/auth.guard';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  const routes: Routes = [
    { path: '', component: LoginExtendedComponent, pathMatch: 'full' },
    { path: 'login', component: LoginExtendedComponent },
    { path: 'login/:returnUrl', component: LoginExtendedComponent },
    { path: 'dashboard', component: DashboardExtendedComponent, canActivate: [AuthGuard] },
  ];
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, MatSidenavModule, MatExpansionModule, RouterTestingModule.withRoutes(routes)],
      declarations: [MainNavComponent].concat(EntryComponents),
      providers: [UsersService],
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
  }));

  it('should compile', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should switch the language', () => {
    spyOn(component.translate, 'use');
    spyOn(Storage.prototype, 'setItem').and.returnValue();
    spyOn(component.usersService, 'updateLanguage').and.returnValue(of(null));

    let lang = 'en';
    component.switchLanguage(lang);

    expect(component.translate.use).toHaveBeenCalledWith(lang);
    expect(localStorage.setItem).toHaveBeenCalledWith('selectedLanguage', lang);
    expect(component.usersService.updateLanguage).toHaveBeenCalledWith(lang);
    expect(component.selectedLanguage).toEqual(lang);
  });

  it('should set user preference with the values fetched from localStorage', () => {
    let item = 'item';
    spyOn(component.translate, 'use');
    spyOn(Storage.prototype, 'getItem').and.returnValue(item);
    spyOn(component, 'changeTheme').and.returnValue();

    component.setPreferences();

    expect(component.changeTheme).toHaveBeenCalledWith(item, false);
    expect(component.selectedLanguage).toEqual(item);
    expect(component.translate.use).toHaveBeenCalledWith(item);
  });

  it('should set user preference with default values', () => {
    let themes = ['theme1'];
    let lang = 'en';

    component.selectedLanguage = lang;
    component.themes = themes;
    spyOn(component.translate, 'use');
    spyOn(Storage.prototype, 'getItem').and.returnValue('null');
    spyOn(component, 'changeTheme').and.returnValue();

    component.setPreferences();

    expect(component.changeTheme).toHaveBeenCalledWith(themes[0], false);
    expect(component.selectedLanguage).toEqual(lang);
    expect(component.translate.use).toHaveBeenCalledTimes(0);
  });

  it('should logout the user and navigate to home', async () => {
    const router = TestBed.inject(Router);
    let themes = ['theme1'];

    component.themes = themes;
    spyOn(component.authenticationService, 'logout');
    spyOn(component, 'changeTheme').and.returnValue();
    spyOn(component.translate, 'use');
    spyOn(router, 'navigate').and.stub();

    component.logout();

    expect(router.navigate).toHaveBeenCalledWith(['/']);

    expect(component.changeTheme).toHaveBeenCalledWith(themes[0], false);
    expect(component.authenticationService.logout).toHaveBeenCalled();
    expect(component.translate.use).toHaveBeenCalledTimes(0);
  });

  it('should redirect to login page', async () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.stub();

    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: 'dashboard' } });
  });
  it('should change theme without calling backend service', async () => {
    let themes = ['newTheme', 'appliedTheme'];
    component.themes = themes;
    document.body.classList.add(themes[1]);

    component.changeTheme(themes[0], false);

    expect(document.body.classList.contains(themes[0])).toBeTruthy();
    expect(document.body.classList.contains(themes[1])).toBeFalsy();
  });

  it('should change theme and call backend service', async () => {
    let themes = ['newTheme', 'appliedTheme'];
    spyOn(component.usersService, 'updateTheme').and.returnValue(of(null));
    spyOn(Storage.prototype, 'setItem').and.returnValue();

    component.themes = themes;
    document.body.classList.add(themes[1]);

    component.changeTheme(themes[0], true);

    expect(document.body.classList.contains(themes[0])).toBeTruthy();
    expect(document.body.classList.contains(themes[1])).toBeFalsy();
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', themes[0]);
  });
});
