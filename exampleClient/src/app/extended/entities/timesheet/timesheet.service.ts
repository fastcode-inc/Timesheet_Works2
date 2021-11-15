import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimesheetService } from 'src/app/entities/timesheet/timesheet.service';
@Injectable({
  providedIn: 'root',
})
export class TimesheetExtendedService extends TimesheetService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
