import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEmailVariable } from './iemail-variable';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GenericApiService } from 'src/app/common/shared';
@Injectable({
  providedIn: 'root',
})
export class EmailVariableService extends GenericApiService<IEmailVariable> {
  urlPath;
  private dataToAppend = new BehaviorSubject<string>('');
  readonly dataToSend$ = this.dataToAppend.asObservable();
  constructor(private httpclient: HttpClient) {
    super(httpclient, 'emailbuilder/emailvariable');
  }

  public changeData(str: string) {
    this.dataToAppend.next(str);
  }

  public getEmailVeriableByType(value: string): Observable<IEmailVariable[]> {
    return this.httpclient
      .get<IEmailVariable[]>(this.url + '/getEmailVariableByTypeOrSubject', {
        params: {
          type: value,
        },
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  public getAllWithoutPagination(): Observable<IEmailVariable[]> {
    return this.httpclient.get<IEmailVariable[]>(this.url + '/list').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
