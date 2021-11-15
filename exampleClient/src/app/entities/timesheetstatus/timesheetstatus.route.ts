import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { TimesheetstatusDetailsComponent, TimesheetstatusListComponent, TimesheetstatusNewComponent } from './';

const routes: Routes = [
  // { path: '', component: TimesheetstatusListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: TimesheetstatusDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: TimesheetstatusNewComponent, canActivate: [ AuthGuard ] },
];

export const timesheetstatusRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
