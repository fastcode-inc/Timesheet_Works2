import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UpdatePasswordComponent } from 'src/app/account/update-password/update-password.component';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordExtendedComponent extends UpdatePasswordComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) {
    super(activatedRoute, formBuilder, authenticationService);
  }
}
