import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { UsersDetailsComponent, UsersListComponent, UsersNewComponent } from './';

const routes: Routes = [
  // { path: '', component: UsersListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: UsersDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: UsersNewComponent, canActivate: [ AuthGuard ] },
];

export const usersRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
