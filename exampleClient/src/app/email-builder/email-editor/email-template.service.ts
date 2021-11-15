import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IEmailTemplate } from './iemail-template';
import { IP_CONFIG } from '../tokens';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GenericApiService } from 'src/app/common/shared';

@Injectable({
  providedIn: 'root',
})
export class EmailTemplateService extends GenericApiService<IEmailTemplate> {
  constructor(private httpclient: HttpClient) {
    super(httpclient, 'emailbuilder/email');
  }

  public getAllCategories(): Observable<string[]> {
    return this.httpclient.get<string[]>(this.url + '/categories', {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public getAllTemplates(): Observable<IEmailTemplate[]> {
    return this.httpclient.get<IEmailTemplate[]>(this.url + '/list', {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  public resetTemplateById(id: any): Observable<IEmailTemplate> {
    return this.httpclient.get<IEmailTemplate>(this.url + '/reset/' + id).pipe(catchError(this.handleError));
  }
}
