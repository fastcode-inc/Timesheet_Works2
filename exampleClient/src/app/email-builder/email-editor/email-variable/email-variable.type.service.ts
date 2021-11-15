import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IEmailVariableType } from './iemail-variable-type';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GenericApiService } from 'src/app/common/shared';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmailVariablTypeService extends GenericApiService<IEmailVariableType> {
  constructor(private httpclient: HttpClient) {
    super(httpclient, 'emailbuilder/emailvariabletypes/variable-types');
  }

  getAllMasterValue(masterName): Observable<string[]> {
    let url = this.apiUrl + '/emailbuilder/master/getMastersByMasterName?name=' + masterName;
    return this.httpclient.get<string[]>(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
