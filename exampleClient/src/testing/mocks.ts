export { ActivatedRoute } from '@angular/router';
import { Input, Injectable, Directive } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { ITokenDetail } from 'src/app/core/models/itoken-detail';

// @Directive({
//   selector: '[routerLink]'
// })
// export class RouterLinkDirectiveStub {
//   @Input('routerLink') linkParams: any;
//   navigatedTo: any = null;
//   onClick() {
//     this.navigatedTo = this.linkParams;
//   }
// }

export let GlobalsMock = {
  isSmallDevice$: of({ value: true }),
  isMediumDeviceOrLess$: of({ value: true }),
};

export let ActivatedRouteMock = {
  snapshot: {
    paramMap: {
      get: () => {
        return '1';
      },
    },
    queryParams: {
      get: () => {
        return '1';
      },
    },
  },
};

@Injectable()
export class RouterMock {
  navigate = (commands: any) => {};
}

@Injectable()
export class PickerDialogServiceMock {}

@Injectable()
export class AuthenticationServiceMock {
  permissionsChange = new Subject();
  preferenceChange = new Subject();

  configure() {}

  getMainUsers(): Observable<any> {
    return of([{ id: 1, username: 'user1' }]);
  }

  get token(): string {
    return 'sample token';
  }

  decodeToken(): ITokenDetail {
    return { sub: 'sub1' };
  }

  // ldap, db
  //login(user: any): Observable<any> { return of({}) }

  getLoggedInUserPermissions(): Observable<any> {
    return of(['p1']);
  }

  // oidc
  login() {}

  logout() {}

  getTokenExpirationDate(token: string): Date {
    return new Date();
  }

  isTokenExpired(token?: string): boolean {
    return true;
  }

  hasPermissionOnEntity(entity: string, crudType: string): Boolean {
    return true;
  }

  getProfile() {}
}

@Injectable()
export class GlobalPermissionServiceMock {
  hasPermissionOnEntity(entity: string, crudType: string): Boolean {
    return true;
  }

  hasPermission(permission: string) {
    return true;
  }

  checkPermission(entity: string, crudType: string): boolean {
    return true;
  }
}

export const MatDialogRefMock = {
  afterClosed: () => of(true),
  close: (dialogResult: any) => {},
  updateSize: () => {},
  componentInstance: {
    onScroll: of(true),
    onSearch: of(true),
  },
};

@Injectable()
export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return MatDialogRefMock;
  }
}
