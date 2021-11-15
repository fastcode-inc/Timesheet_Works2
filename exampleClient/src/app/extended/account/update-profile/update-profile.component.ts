import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ErrorService } from 'src/app/core/services/error.service';

import { UsersExtendedService } from 'src/app/extended/admin/user-management/users/index';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { UpdateProfileComponent } from 'src/app/account/update-profile/update-profile.component';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileExtendedComponent extends UpdateProfileComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public usersService: UsersExtendedService,
    public errorService: ErrorService,
    public translate: TranslateService,
    public router: Router
  ) {
    super(formBuilder, usersService, errorService, translate, router);
  }
}
