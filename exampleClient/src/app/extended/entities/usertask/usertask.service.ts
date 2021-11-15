import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsertaskService } from 'src/app/entities/usertask/usertask.service';
@Injectable({
  providedIn: 'root',
})
export class UsertaskExtendedService extends UsertaskService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
