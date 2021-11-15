import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsersrole } from './iusersrole';
import { GenericApiService } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class UsersroleService extends GenericApiService<IUsersrole> {
  constructor(protected httpclient: HttpClient) {
    super(httpclient, 'usersrole');
  }

  convertEnumToArray(enumm: any) {
    const arrayObjects = [];
    // Retrieve key and values using Object.entries() method.
    for (const [propertyKey, propertyValue] of Object.entries(enumm)) {
      // Add values to array
      arrayObjects.push(propertyValue);
    }

    return arrayObjects;
  }
}
