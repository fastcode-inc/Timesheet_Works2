import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TimesheetDetailsExtendedComponent, TimesheetListExtendedComponent, TimesheetNewExtendedComponent } from './';

const routes: Routes = [
  {
    path: '',
    component: TimesheetListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: TimesheetDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: TimesheetNewExtendedComponent, canActivate: [AuthGuard] },
];

export const timesheetRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
