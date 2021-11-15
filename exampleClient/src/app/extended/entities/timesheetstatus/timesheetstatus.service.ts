import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimesheetstatusService } from 'src/app/entities/timesheetstatus/timesheetstatus.service';
@Injectable({
  providedIn: 'root',
})
export class TimesheetstatusExtendedService extends TimesheetstatusService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
