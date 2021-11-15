import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate.guard';
// import { AuthGuard } from 'src/app/core/guards/auth.guard';

// import { RolepermissionDetailsComponent, RolepermissionListComponent, RolepermissionNewComponent } from './';

const routes: Routes = [
  // { path: '', component: RolepermissionListComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: ':id', component: RolepermissionDetailsComponent, canDeactivate: [CanDeactivateGuard], canActivate: [ AuthGuard ] },
  // { path: 'new', component: RolepermissionNewComponent, canActivate: [ AuthGuard ] },
];

export const rolepermissionRoute: ModuleWithProviders<any> = RouterModule.forChild(routes);
