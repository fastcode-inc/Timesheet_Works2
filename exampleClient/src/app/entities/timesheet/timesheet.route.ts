import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { TimesheetDetailsComponent, TimesheetListComponent, TimesheetNewComponent } from './';

const routes: Routes = [
  // { path: '', component: TimesheetListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: TimesheetDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: TimesheetNewComponent, canActivate: [ AuthGuard ] },
];

export const timesheetRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
