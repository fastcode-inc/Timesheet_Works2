import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IEmailTemplate } from './iemail-template';
import { GenericApiService } from 'src/app/common/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MailTemplateService {
  url = environment.apiUrl + '/emailapi/mail';
  constructor(private httpclient: HttpClient) {}

  send(emailtemplate) {
    return this.httpclient.post<any>(this.url + '/send', emailtemplate);
  }
}
