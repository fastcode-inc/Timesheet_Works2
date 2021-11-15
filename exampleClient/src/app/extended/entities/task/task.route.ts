import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { TaskDetailsExtendedComponent, TaskListExtendedComponent, TaskNewExtendedComponent } from './';

const routes: Routes = [
  { path: '', component: TaskListExtendedComponent, canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard] },
  {
    path: ':id',
    component: TaskDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: TaskNewExtendedComponent, canActivate: [AuthGuard] },
];

export const taskRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
