import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IP_CONFIG } from '../../../tokens';
import { IDataSource } from '../../../email-editor/data-source/Models/IDataSource';
import { map, catchError } from 'rxjs/operators';
import { GenericApiService } from 'src/app/common/shared';
@Injectable({
  providedIn: 'root',
})
export class DataSourceService extends GenericApiService<IDataSource> {
  urlPath;
  private tableClose: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly tableClose$ = this.tableClose.asObservable();

  private dataToAppend = new BehaviorSubject<string>('');
  readonly dataToSend$ = this.dataToAppend.asObservable();

  private previewTableData: BehaviorSubject<Object> = new BehaviorSubject({});
  readonly previewTableData$ = this.previewTableData.asObservable();

  constructor(private httpclient: HttpClient) {
    super(httpclient, 'emailbuilder/datasource');
  }

  changetableClose(data: boolean) {
    this.tableClose.next(data);
  }

  setTableContent(data: any) {
    this.previewTableData.next(data);
  }

  public changeData(str: string) {
    this.dataToAppend.next(str);
  }

  public previewData(query): Observable<any> {
    let url = this.url + '/preview/table?query=' + encodeURI(query);
    return this.httpclient.get<any>(url, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
