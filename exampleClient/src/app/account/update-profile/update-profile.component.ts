import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ErrorService } from 'src/app/core/services/error.service';

import { UsersService } from 'src/app/admin/user-management/users/index';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  title: string = this.translate.instant('ACCOUNT.UPDATE-PROFILE.TITLE');
  userForm: FormGroup;
  user: any;
  submitted: boolean = false;
  loading: boolean = false;

  /**
   * Guard against browser refresh, close, etc.
   * Checks if user has some unsaved changes
   * before leaving the page.
   */
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (this.userForm.dirty && !this.submitted) {
      return false;
    }
    return true;
  }
  constructor(
    public formBuilder: FormBuilder,
    public usersService: UsersService,
    public errorService: ErrorService,
    public translate: TranslateService,
    public router: Router
  ) {}

  ngOnInit() {
    this.setForm();
    this.getItem();
  }

  setForm() {
    this.userForm = this.formBuilder.group({
      emailaddress: ['', Validators.required],
      firstname: ['', Validators.required],
      isemailconfirmed: [false, Validators.required],
      joinDate: [''],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  getItem() {
    this.usersService.getProfile().subscribe(
      (user) => {
        this.user = user;
        this.userForm.patchValue(user);
      },
      (error) => {
        this.errorService.showError(this.translate.instant('GENERAL.ERRORS.FETCHING-DETAILS'));
      }
    );
  }

  /**
   * Gets data from item form and calls
   * service method to update the item.
   */
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.submitted = true;
    this.loading = true;
    this.usersService
      .updateProfile(this.userForm.getRawValue())
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.errorService.showError(this.translate.instant('ACCOUNT.UPDATE-PROFILE.UPDATED-MESSAGE'));
          // this.router.navigate([this.parentUrl], { relativeTo: this.route.parent });
        },
        (error) => {
          this.loading = false;
          this.errorService.showError(this.translate.instant('GENERAL.ERRORS.UPDATE'));
        }
      );
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
