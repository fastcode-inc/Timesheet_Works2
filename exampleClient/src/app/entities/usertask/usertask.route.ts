import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { UsertaskDetailsComponent, UsertaskListComponent, UsertaskNewComponent } from './';

const routes: Routes = [
  // { path: '', component: UsertaskListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: UsertaskDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: UsertaskNewComponent, canActivate: [ AuthGuard ] },
];

export const usertaskRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
