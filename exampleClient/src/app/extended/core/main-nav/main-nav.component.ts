import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/index';

import { Globals } from 'src/app/core/services/globals';
import { MainNavComponent } from 'src/app/core/main-nav/main-nav.component';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss', './main-nav-mixin.component.scss'],
})
export class MainNavExtendedComponent extends MainNavComponent {
  constructor(
    public router: Router,
    public translate: TranslateService,
    public globals: Globals,

    public authenticationService: AuthenticationService,
    public globalPermissionService: GlobalPermissionService,
    public usersExtendedService: UsersExtendedService
  ) {
    super(
      router,
      translate,
      globals,

      authenticationService,
      globalPermissionService,
      usersExtendedService
    );
  }
}
