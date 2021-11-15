import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router, Event } from '@angular/router';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Entities, AuthEntities, EmailEntities } from './entities';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { UsersService } from 'src/app/admin/user-management/users';

import { Globals } from 'src/app/core/services/globals';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss', './main-nav-mixin.component.scss'],
})
export class MainNavComponent {
  @ViewChild('drawer', { static: false }) drawer: MatSidenav;
  @ViewChild('navContent', { static: false }) navContent: MatSidenavContent;

  appName: string = 'example';
  selectedLanguage: any;
  entityList = Entities;

  hasTaskAppPermission: boolean = false;
  hasAdminAppPermission: boolean = false;

  isSmallDevice$: Observable<boolean>;
  isMediumDevice$: Observable<boolean>;

  themes: any[] = ['default-theme', 'alt-theme'];
  username: any = '';

  permissions: any = {};
  authEntityList = AuthEntities;
  allEntities: string[] = [...AuthEntities, ...Entities, ...EmailEntities];
  modules: any = {
    email: EmailEntities,
  };

  constructor(
    public router: Router,
    public translate: TranslateService,
    public Global: Globals,

    public authenticationService: AuthenticationService,
    public globalPermissionService: GlobalPermissionService,
    public usersService: UsersService
  ) {
    this.isSmallDevice$ = Global.isSmallDevice$;
    this.isMediumDevice$ = Global.isMediumDevice$;

    this.selectedLanguage = localStorage.getItem('selectedLanguage');
    this.authenticationService.permissionsChange.subscribe(() => {
      this.setPermissions();
    });
    this.setPermissions();
    this.authenticationService.preferenceChange.subscribe(() => {
      this.setPreferences();
    });
    this.setPreferences();
  }

  isActive(url: any): boolean {
    return this.router.url.split('/').includes(url);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('selectedLanguage', language);
    this.selectedLanguage = language;
    this.usersService.updateLanguage(language).subscribe((data) => {});
  }

  setPreferences() {
    let theme = localStorage.getItem('theme');
    let language = localStorage.getItem('selectedLanguage');

    if (theme && theme != 'undefined' && theme != 'null') {
      this.changeTheme(theme, false);
    } else {
      this.changeTheme(this.themes[0], false);
    }
    if (language && language != 'undefined' && language != 'null') {
      this.selectedLanguage = language;
      this.translate.use(language);
    }
  }

  setPermissions() {
    if (this.authenticationService.decodeToken()) {
      this.username = this.authenticationService.decodeToken().sub;
    }
    this.allEntities.forEach((entity) => {
      this.permissions[entity] = this.globalPermissionService.hasPermissionOnEntity(entity, 'READ');
    });
    this.setModulesVisibility();
  }

  setModulesVisibility() {
    Object.keys(this.modules).forEach((module) => {
      let modulePermission = `show${module[0].toUpperCase() + module.slice(1)}`;
      this.permissions[modulePermission] = false;
      this.modules[module].forEach((entity: any) => {
        if (this.permissions[entity]) {
          this.permissions[modulePermission] = true;
          this.permissions['showTools'] = true;
        }
      });
    });
  }

  login() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: 'dashboard' } });
  }

  logout() {
    this.authenticationService.logout();
    this.changeTheme(this.themes[0], false);
    this.router.navigate(['/']);
  }
  changeTheme(theme: any, updatePreference: boolean) {
    console.log('add css class');
    for (let i = 0; i < this.themes.length; i++) {
      if (document.body.className.match(this.themes[i])) {
        document.body.classList.remove(this.themes[i]);
      }
    }
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    if (updatePreference) {
      this.usersService.updateTheme(theme).subscribe((data) => {
        console.log(data);
      });
    }
  }
}
