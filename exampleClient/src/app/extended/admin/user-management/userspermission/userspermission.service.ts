import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserspermissionService } from 'src/app/admin/user-management/userspermission/userspermission.service';
@Injectable({
  providedIn: 'root',
})
export class UserspermissionExtendedService extends UserspermissionService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
