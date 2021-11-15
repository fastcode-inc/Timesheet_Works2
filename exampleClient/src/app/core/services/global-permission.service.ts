import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITokenDetail } from 'src/app/core/models/itoken-detail';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalPermissionService {
  public authUrl = environment.apiUrl;
  constructor(public authService: AuthenticationService) {}

  hasPermissionOnEntity(entity: any, crudType: string): Boolean {
    if (!entity) {
      return false;
    }
    let permission = `${entity}ENTITY_${crudType}`.toUpperCase();
    return this.hasPermission(permission);
  }

  hasPermission(permission: string) {
    let tokenDetails: ITokenDetail = this.authService.decodeToken();
    if (!tokenDetails) {
      return false;
    }
    if (tokenDetails.scopes && tokenDetails.scopes.indexOf(permission) > -1) {
      return true;
    } else {
      return false;
    }
  }
}
