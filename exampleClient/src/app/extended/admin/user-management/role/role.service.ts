import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleService } from 'src/app/admin/user-management/role/role.service';
@Injectable({
  providedIn: 'root',
})
export class RoleExtendedService extends RoleService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
