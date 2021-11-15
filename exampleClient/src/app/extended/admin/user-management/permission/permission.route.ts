import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  PermissionDetailsExtendedComponent,
  PermissionListExtendedComponent,
  PermissionNewExtendedComponent,
} from './';

const routes: Routes = [
  {
    path: '',
    component: PermissionListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: PermissionDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: PermissionNewExtendedComponent, canActivate: [AuthGuard] },
];

export const permissionRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
