import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/admin/user-management/users/users.service';
@Injectable({
  providedIn: 'root',
})
export class UsersExtendedService extends UsersService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
