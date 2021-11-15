import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersroleService } from 'src/app/admin/user-management/usersrole/usersrole.service';
@Injectable({
  providedIn: 'root',
})
export class UsersroleExtendedService extends UsersroleService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
