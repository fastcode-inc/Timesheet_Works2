import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  RolepermissionDetailsExtendedComponent,
  RolepermissionListExtendedComponent,
  RolepermissionNewExtendedComponent,
} from './';

const routes: Routes = [
  {
    path: '',
    component: RolepermissionListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: RolepermissionDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: RolepermissionNewExtendedComponent, canActivate: [AuthGuard] },
];

export const rolepermissionRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
