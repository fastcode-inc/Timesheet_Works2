import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  disabled: any = false;
  linkSent: boolean = false;

  returnUrl: string = 'fastcode';

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.form();
  }

  form() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.email]),
    });
  }

  forgotPassword() {
    this.disabled = true;
    if (this.resetForm.invalid) {
      this.disabled = false;
      return;
    }

    let forgetPasswordInput = {
      email: this.resetForm.value.email,
      clientUrl: location.origin,
    };
    this.authenticationService
      .forgotPassword(forgetPasswordInput)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          this.linkSent = true;
        },
        (error) => {
          this.disabled = false;
        }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
