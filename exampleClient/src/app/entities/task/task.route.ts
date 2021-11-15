import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { TaskDetailsComponent, TaskListComponent, TaskNewComponent } from './';

const routes: Routes = [
  // { path: '', component: TaskListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: TaskDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: TaskNewComponent, canActivate: [ AuthGuard ] },
];

export const taskRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
