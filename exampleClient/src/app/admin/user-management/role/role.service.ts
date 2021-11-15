import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRole } from './irole';
import { GenericApiService } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends GenericApiService<IRole> {
  constructor(protected httpclient: HttpClient) {
    super(httpclient, 'role');
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
