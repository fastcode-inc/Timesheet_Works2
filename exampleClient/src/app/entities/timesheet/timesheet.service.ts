import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITimesheet } from './itimesheet';
import { GenericApiService } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService extends GenericApiService<ITimesheet> {
  constructor(protected httpclient: HttpClient) {
    super(httpclient, 'timesheet');
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
