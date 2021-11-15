import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
const routes: Routes = [
  /*
	{ path: "update-profile", component: UpdateProfileComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'update-password', component: UpdatePasswordComponent, canActivate: [AuthGuard] },

	*/
];

export const routingModule: ModuleWithProviders<any> = RouterModule.forChild(routes);
