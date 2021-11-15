import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private readonly documentIsAccessible: boolean;

  constructor(
    @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>
  ) {
    this.documentIsAccessible = isPlatformBrowser(this.platformId);
  }

  private check(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }

    const regExp: RegExp = this.getCookieRegExp(name);
    return regExp.test(this.document.cookie);
  }
  public get(name: string): string {
    if (this.documentIsAccessible && this.check(name)) {
      const regExp: RegExp = this.getCookieRegExp(name);
      const result: any = regExp.exec(this.document.cookie);

      return result[1];
    } else {
      return '';
    }
  }
  public set(
    name: string,
    value: string,
    expires?: number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'Strict'
  ): void {
    if (!this.documentIsAccessible) {
      return;
    }

    let cookieString: string = name + '=' + value + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if (path) {
      cookieString += 'path=' + path + ';';
    }

    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }

    if (secure) {
      cookieString += 'secure;';
    }

    if (sameSite) {
      cookieString += 'sameSite=' + sameSite + ';';
    }

    this.document.cookie = cookieString;
  }
  public delete(name: string, path?: string, domain?: string): void {
    if (!this.documentIsAccessible) {
      return;
    }

    this.set(name, '', new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain);
  }
  private getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }
}
