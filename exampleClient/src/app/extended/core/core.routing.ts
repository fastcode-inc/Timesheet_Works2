import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoginExtendedComponent } from './login/login.component';
import { DashboardExtendedComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginExtendedComponent, pathMatch: 'full' },
  { path: 'login', component: LoginExtendedComponent },
  { path: 'login/:returnUrl', component: LoginExtendedComponent },
  { path: 'dashboard', component: DashboardExtendedComponent, canActivate: [AuthGuard] },
];

export const CoreRoutingExtendedModule: ModuleWithProviders<any> = RouterModule.forChild(routes);
