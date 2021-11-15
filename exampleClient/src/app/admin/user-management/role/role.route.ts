import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { RoleDetailsComponent, RoleListComponent, RoleNewComponent } from './';

const routes: Routes = [
  // { path: '', component: RoleListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: RoleDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: RoleNewComponent, canActivate: [ AuthGuard ] },
];

export const roleRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
