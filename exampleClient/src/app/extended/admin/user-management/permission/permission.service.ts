import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PermissionService } from 'src/app/admin/user-management/permission/permission.service';
@Injectable({
  providedIn: 'root',
})
export class PermissionExtendedService extends PermissionService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
