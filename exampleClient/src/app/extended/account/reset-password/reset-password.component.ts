import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ResetPasswordComponent } from 'src/app/account/reset-password/reset-password.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordExtendedComponent extends ResetPasswordComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) {
    super(activatedRoute, formBuilder, authenticationService);
  }
}
