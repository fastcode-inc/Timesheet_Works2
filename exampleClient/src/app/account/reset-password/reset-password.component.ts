import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string;
  resetForm: FormGroup;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  disabled: any = false;
  passwordUpdated: boolean = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.resetToken = this.activatedRoute.snapshot.queryParams['token'];
    this.setForm();
  }

  setForm() {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  resetPassword() {
    this.disabled = true;
    if (this.resetForm.invalid) {
      this.disabled = false;
      return;
    }
    let data = {
      password: this.resetForm.value.password,
      token: this.resetToken,
    };

    this.authenticationService
      .resetPassword(data)
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
