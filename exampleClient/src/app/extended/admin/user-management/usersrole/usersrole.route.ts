import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UsersroleDetailsExtendedComponent, UsersroleListExtendedComponent, UsersroleNewExtendedComponent } from './';

const routes: Routes = [
  {
    path: '',
    component: UsersroleListExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: UsersroleDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: UsersroleNewExtendedComponent, canActivate: [AuthGuard] },
];

export const usersroleRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
