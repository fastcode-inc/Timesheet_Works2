import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { CookieService } from './cookie.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    if (request.headers.get('content-type') == 'multipart/form-data') {
      request = request.clone({ headers: request.headers.delete('content-type', 'multipart/form-data') });
    } else {
      request = request.clone({ headers: request.headers.set('content-type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('X-XSRF-TOKEN', this.cookieService.get('XSRF-TOKEN')) });
    const token = this.authService.token;
    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', token) });
    }

    if (request.url.includes(environment.apiUrl)) {
      request = request.clone({
        withCredentials: true,
      });
    }

    return next.handle(request);
  }
}
