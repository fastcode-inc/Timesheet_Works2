import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITimesheetdetails } from './itimesheetdetails';
import { GenericApiService } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class TimesheetdetailsService extends GenericApiService<ITimesheetdetails> {
  constructor(protected httpclient: HttpClient) {
    super(httpclient, 'timesheetdetails');
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
