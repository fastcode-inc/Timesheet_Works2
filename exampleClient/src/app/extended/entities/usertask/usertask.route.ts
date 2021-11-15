import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UsertaskDetailsExtendedComponent, UsertaskListExtendedComponent, UsertaskNewExtendedComponent } from './';

const routes: Routes = [
  { path: '', component: UsertaskListExtendedComponent, canDeactivate: [CanDeactivateGuard], canActivate: [AuthGuard] },
  {
    path: ':id',
    component: UsertaskDetailsExtendedComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [AuthGuard],
  },
  { path: 'new', component: UsertaskNewExtendedComponent, canActivate: [AuthGuard] },
];

export const usertaskRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
