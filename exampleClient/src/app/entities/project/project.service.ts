import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from './iproject';
import { GenericApiService } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends GenericApiService<IProject> {
  constructor(protected httpclient: HttpClient) {
    super(httpclient, 'project');
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
