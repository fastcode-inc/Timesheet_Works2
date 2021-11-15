import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolepermissionService } from 'src/app/admin/user-management/rolepermission/rolepermission.service';
@Injectable({
  providedIn: 'root',
})
export class RolepermissionExtendedService extends RolepermissionService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
