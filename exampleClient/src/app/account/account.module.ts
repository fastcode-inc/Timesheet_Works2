import { NgModule } from '@angular/core';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SharedModule } from 'src/app/common/shared';
import { routingModule } from './account.routing';

@NgModule({
  declarations: [ForgotPasswordComponent, UpdatePasswordComponent, ResetPasswordComponent, UpdateProfileComponent],
  exports: [ForgotPasswordComponent, UpdatePasswordComponent, ResetPasswordComponent, UpdateProfileComponent],
  imports: [routingModule, SharedModule],
})
export class AccountModule {}
