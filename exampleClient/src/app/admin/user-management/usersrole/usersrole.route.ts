import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { UsersroleDetailsComponent, UsersroleListComponent, UsersroleNewComponent } from './';

const routes: Routes = [
  // { path: '', component: UsersroleListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: UsersroleDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: UsersroleNewComponent, canActivate: [ AuthGuard ] },
];

export const usersroleRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
