import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimesheetdetailsService } from 'src/app/entities/timesheetdetails/timesheetdetails.service';
@Injectable({
  providedIn: 'root',
})
export class TimesheetdetailsExtendedService extends TimesheetdetailsService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
