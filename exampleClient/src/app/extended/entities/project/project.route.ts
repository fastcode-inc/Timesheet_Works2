import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProjectDetailsExtendedComponent, ProjectListExtendedComponent, ProjectNewExtendedComponent } from './';

const routes: Routes = [
  { path: '', component: ProjectListExtendedComponent, canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard] },
  {
    path: ':id',
    component: ProjectDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: ProjectNewExtendedComponent, canActivate: [AuthGuard] },
];

export const projectRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
