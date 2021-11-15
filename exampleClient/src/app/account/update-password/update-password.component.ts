import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  apiError: any = { show: false, msg: '' };
  disabled: any = false;
  passwordUpdated: boolean = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  updatePassword() {
    this.disabled = true;
    if (this.updatePasswordForm.invalid) {
      this.disabled = false;
      return;
    }

    this.authenticationService
      .updatePassword(this.updatePasswordForm.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.passwordUpdated = true;
        },
        (error) => {
          this.disabled = false;
        }
      );
  }
}
