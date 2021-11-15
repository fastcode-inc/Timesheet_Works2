import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import {
  TimesheetdetailsDetailsExtendedComponent,
  TimesheetdetailsListExtendedComponent,
  TimesheetdetailsNewExtendedComponent,
} from './';

const routes: Routes = [
  {
    path: '',
    component: TimesheetdetailsListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: TimesheetdetailsDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: TimesheetdetailsNewExtendedComponent, canActivate: [AuthGuard] },
];

export const timesheetdetailsRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
