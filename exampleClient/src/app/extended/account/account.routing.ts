import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { ForgotPasswordExtendedComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordExtendedComponent } from './reset-password/reset-password.component';
import { UpdatePasswordExtendedComponent } from './update-password/update-password.component';
import { UpdateProfileExtendedComponent } from './update-profile/update-profile.component';
const routes: Routes = [
  {
    path: 'update-profile',
    component: UpdateProfileExtendedComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
  },
  { path: 'forgot-password', component: ForgotPasswordExtendedComponent },
  { path: 'reset-password', component: ResetPasswordExtendedComponent },
  { path: 'update-password', component: UpdatePasswordExtendedComponent, canActivate: [AuthGuard] },
];

export const routingModule: ModuleWithProviders<any> = RouterModule.forChild(routes);
