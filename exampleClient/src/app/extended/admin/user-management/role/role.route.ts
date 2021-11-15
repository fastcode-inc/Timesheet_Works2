import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleDetailsExtendedComponent, RoleListExtendedComponent, RoleNewExtendedComponent } from './';

const routes: Routes = [
  { path: '', component: RoleListExtendedComponent, canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard] },
  {
    path: ':id',
    component: RoleDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: RoleNewExtendedComponent, canActivate: [AuthGuard] },
];

export const roleRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
