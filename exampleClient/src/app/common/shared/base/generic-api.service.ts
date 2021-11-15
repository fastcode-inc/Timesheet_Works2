import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ISearchField } from '../components/list-filters/ISearchCriteria';
import { ServiceUtils } from '../utils/serviceUtils';
import { environment } from 'src/environments/environment';

@Injectable()
export class GenericApiService<T> {
  protected url = '';
  protected apiUrl = '';
  constructor(protected http: HttpClient, public suffix: string) {
    this.apiUrl = environment.apiUrl;
    this.url = environment.apiUrl + '/' + suffix;
    this.suffix = suffix;
  }

  /**
   * Fetches list of items based on
   * given criteria.
   * @param searchFields Search criteria.
   * @param offset No. of items to be skipped.
   * @param limit Maximum no. of records.
   * @param sort Field and direction information for sorting.
   * @returns Observable of items list.
   */
  public getAll(searchFields?: ISearchField[], offset?: number, limit?: number, sort?: string): Observable<T[]> {
    let params = ServiceUtils.buildQueryData(searchFields, offset, limit, sort);

    return this.http
      .get<T[]>(this.url, { params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Fetches specific child's object of given parent.
   * @param childSuffix Url suffix for the child to be fetched.
   * @param id Item id of parent.
   */
  getChild(childSuffix: string, id: any): Observable<any> {
    return this.http.get<T>(this.url + '/' + id + '/' + childSuffix).pipe(catchError(this.handleError));
  }

  /**
   * Fetches list of child entity.
   * @param childSuffix Url suffix of the child entity.
   * @param Id
   * @param searchFields Search criteria.
   * @param offset No. of items to be skipped.
   * @param limit Maximum no. of records.
   * @param sort Field and direction information for sorting.
   * @returns Observable of items list.
   */
  getAssociations(
    childSuffix: any,
    id: any,
    searchFields?: ISearchField[],
    offset?: number,
    limit?: number,
    sort?: string
  ): Observable<any[]> {
    let url = this.apiUrl + '/' + this.suffix + '/' + id + '/' + childSuffix;
    let params = ServiceUtils.buildQueryData(searchFields, offset, limit, sort);
    return this.http
      .get<T[]>(url, { params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Fetches list of child entity
   *  which does not belong to this item.
   * @param childSuffix Url suffix of the child entity.
   * @param id
   * @param searchFields Search criteria.
   * @param offset No. of items to be skipped.
   * @param limit Maximum no. of records.
   * @param sort Field and direction information for sorting.
   * @returns Observable of items list.
   */
  getAvailableAssociations(
    childSuffix: string,
    id: any,
    searchFields?: ISearchField[],
    offset?: number,
    limit?: number,
    sort?: string
  ): Observable<any[]> {
    let url =
      this.apiUrl + '/' + this.suffix + '/' + id + '/available' + childSuffix[0].toUpperCase() + childSuffix.slice(1);
    let params = ServiceUtils.buildQueryData(searchFields, offset, limit, sort);
    return this.http
      .get<T[]>(url, { params })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Fetches item against given id.
   * @param id
   * @returns Observable of entity object.
   */
  public getById(id: any): Observable<T> {
    return this.http.get<T>(this.url + '/' + id).pipe(catchError(this.handleError));
  }

  /**
   * Calls api to create given item.
   * @param item
   * @returns Observable of created entity object.
   */
  public create(item: T, headers?): Observable<T> {
    return this.http
      .post<T>(this.url, item, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Call api to update given item.
   * @param item
   * @param id
   * @returns Observable of updated entity object.
   */
  public update(item: T, id: any, headers?): Observable<T> {
    return this.http
      .put<T>(this.url + '/' + id, item, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Call api to delete item agianst given id.
   * @param id
   */
  public delete(id: any): Observable<null> {
    return this.http.delete(this.url + '/' + id).pipe(
      map((res) => null),
      catchError(this.handleError)
    );
  }

  /**
   * General method to call any get api.
   * @param url
   */
  public get(url: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${url}`, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * General method to call any post api.
   * @param url
   * @param data
   */
  public post(url: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${url}`, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * General method to call any delete api.
   * @param url
   */
  public deleteByUrl(url: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${url}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  combineDateAndTime(date: string, time: string): Date {
    let tmpDate = new Date(date);
    let ham = this.getHoursAndMinutes(time);
    tmpDate.setHours(ham.hours ? ham.hours : 0);
    tmpDate.setMinutes(ham.minutes ? ham.minutes : 0);
    return tmpDate;
  }

  public downloadFile(id: any, fieldName: string): Observable<any> {
    return this.http
      .get(`${this.url}/download/${id}/${fieldName}`, {
        responseType: 'blob',
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getHoursAndMinutes(time: string) {
    let hours: number = parseInt(time.substring(0, 2));
    let minutes = parseInt(time.substring(3, 5));
    let ampm = time.substring(6, 8) ? time.substring(6, 8) : 'am';
    if (ampm.toLocaleLowerCase() == 'pm' && hours < 12) {
      hours = hours + 12;
    } else if (ampm.toLocaleLowerCase() == 'am' && hours === 12) {
      hours = 0;
    }
    return { hours: hours, minutes: minutes };
  }

  formatDateStringToAMPM(d: any) {
    if (d) {
      var date = new Date(d);
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      var minutes_str = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes_str + ' ' + ampm;
      return strTime;
    }
    return null;
  }

  getFormattedTime(time: string, withOffset: boolean) {
    let ham = this.getHoursAndMinutes(time);
    let hours = ham.hours > 9 ? ham.hours.toString() : '0' + ham.hours.toString();
    let minutes = ham.minutes > 9 ? ham.minutes.toString() : '0' + ham.minutes.toString();
    let timeStr = `${hours}:${minutes}:00`;
    if (withOffset) {
      timeStr += this.getOffset();
    }
    return timeStr;
  }

  getOffset() {
    const offset = -new Date().getTimezoneOffset();
    const d = offset / 60;
    let h = Math.floor(d);
    let m = offset % 60;
    if (d < 0) {
      h = Math.ceil(d);
      h = -h;
      m = -m;
    }

    let minutes = m.toString();
    let hours = h.toString();
    if (m < 10) {
      minutes = '0' + minutes;
    }
    if (h < 10) {
      hours = '0' + hours;
    }
    let offsetStr = `${hours}:${minutes}`;
    if (d < 0) {
      offsetStr = '-' + offsetStr;
    } else {
      offsetStr = '+' + offsetStr;
    }
    return offsetStr;
  }

  /**
   * Handles Api error events.
   * @param err
   */
  protected handleError(err: HttpErrorResponse) {
    let errorMessage;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred: ' + err.error.message;
    } else {
      console.log(err);
      errorMessage = 'Server returned code: ' + err.status + ', error message is: ' + err.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
