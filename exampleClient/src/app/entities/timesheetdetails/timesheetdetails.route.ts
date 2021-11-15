import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { TimesheetdetailsDetailsComponent, TimesheetdetailsListComponent, TimesheetdetailsNewComponent } from './';

const routes: Routes = [
  // { path: '', component: TimesheetdetailsListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: TimesheetdetailsDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: TimesheetdetailsNewComponent, canActivate: [ AuthGuard ] },
];

export const timesheetdetailsRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
