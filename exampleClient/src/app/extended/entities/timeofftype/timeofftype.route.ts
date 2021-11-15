import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  TimeofftypeDetailsExtendedComponent,
  TimeofftypeListExtendedComponent,
  TimeofftypeNewExtendedComponent,
} from './';

const routes: Routes = [
  {
    path: '',
    component: TimeofftypeListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: TimeofftypeDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: TimeofftypeNewExtendedComponent, canActivate: [AuthGuard] },
];

export const timeofftypeRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
