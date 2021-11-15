import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ForgotPasswordComponent } from 'src/app/account/forgot-password/forgot-password.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordExtendedComponent extends ForgotPasswordComponent implements OnInit {
  constructor(public authenticationService: AuthenticationService) {
    super(authenticationService);
  }
}
