import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ILogin } from './ilogin';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  errorMessage = '';
  iLogin: ILogin = {} as ILogin;
  loading = false;
  submitted = false;
  returnUrl: string = 'dashboard';
  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.setForm();
    this.returnUrl = 'dashboard';
    if (this.route.snapshot.queryParams) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
    }

    if (this.authenticationService.token) {
      if (!this.authenticationService.isTokenExpired(this.authenticationService.token)) {
        this.router.navigate([this.returnUrl]);
        return;
      } else {
        this.authenticationService.logout();
      }
    }
  }
  setForm() {
    this.itemForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        password: ['', Validators.required],
      },
      { validators: this.validateEmailAndPassword }
    );
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.itemForm.controls;
  }
  validateEmailAndPassword: ValidationErrors = (control: FormGroup): ValidationErrors | null => {
    const name = control.get('userName');
    const alterEgo = control.get('password');
    return null;
  };

  onSubmit() {
    this.submitted = true;

    this.iLogin.userName = this.itemForm.value.userName;
    this.iLogin.password = this.itemForm.value.password;

    this.loading = true;
    this.authenticationService.login(this.iLogin).subscribe(
      (res) => {
        this.loading = false;
        if (res.status === 'EmailNotConfirmed') {
          this.itemForm.setErrors({ emailNotConfirmedError: true });
        } else {
          this.authenticationService.permissionsChange.next();
          this.authenticationService.getProfile();
          this.router.navigate([this.returnUrl]);
        }
      },
      (error) => {
        this.itemForm.setErrors({ passwordUserNameError: true });
        this.loading = false;
      }
    );
  }
  onBack(): void {
    this.router.navigate(['/']);
  }
}
