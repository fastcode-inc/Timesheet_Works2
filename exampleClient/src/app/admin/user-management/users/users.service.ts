import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsers } from './iusers';
import { GenericApiService } from 'src/app/common/shared';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends GenericApiService<IUsers> {
  constructor(protected httpclient: HttpClient) {
    super(httpclient, 'users');
  }

  /**
   * Call api to update user profile.
   * @param item
   * @returns Observable of updated entity object.
   */
  public updateProfile(user: IUsers): Observable<IUsers> {
    return this.httpclient.put<IUsers>(this.url + '/updateProfile', user).pipe(catchError(this.handleError));
  }

  getProfile() {
    return this.httpclient.get<IUsers>(this.url + '/getProfile').pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateTheme(theme: string) {
    return this.httpclient.put(`${this.url}/updateTheme?theme=${theme}`, null).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateLanguage(language: string) {
    return this.httpclient.put(`${this.url}/updateLanguage?language=${language}`, null).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  convertEnumToArray(enumm: any) {
    const arrayObjects = [];
    // Retrieve key and values using Object.entries() method.
    for (const [propertyKey, propertyValue] of Object.entries(enumm)) {
      // Add values to array
      arrayObjects.push(propertyValue);
    }

    return arrayObjects;
  }
}
