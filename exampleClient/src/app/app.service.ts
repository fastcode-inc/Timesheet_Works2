import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(protected httpclient: HttpClient) {}

  public getFontFamily(): Observable<any> {
    return this.httpclient.get(
      'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA2NeyaU_iGuS4IDFGZaLOhMwBFgPGYzQs'
    );
  }
}
