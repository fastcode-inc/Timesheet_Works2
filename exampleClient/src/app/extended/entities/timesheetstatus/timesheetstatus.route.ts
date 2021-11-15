import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  TimesheetstatusDetailsExtendedComponent,
  TimesheetstatusListExtendedComponent,
  TimesheetstatusNewExtendedComponent,
} from './';

const routes: Routes = [
  {
    path: '',
    component: TimesheetstatusListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: TimesheetstatusDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: TimesheetstatusNewExtendedComponent, canActivate: [AuthGuard] },
];

export const timesheetstatusRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
