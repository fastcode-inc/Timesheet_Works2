import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeofftypeService } from 'src/app/entities/timeofftype/timeofftype.service';
@Injectable({
  providedIn: 'root',
})
export class TimeofftypeExtendedService extends TimeofftypeService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
