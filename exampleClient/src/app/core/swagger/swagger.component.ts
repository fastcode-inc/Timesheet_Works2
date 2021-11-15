import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import SwaggerUI from 'swagger-ui';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CookieService } from 'src/app/core/services/cookie.service';
import { HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css'],
})
export class SwaggerComponent implements OnInit, AfterViewInit {
  @ViewChild('swagger', { static: false }) el: any;
  constructor(private authService: AuthenticationService, private cookieService: CookieService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    SwaggerUI({
      domNode: this.el.nativeElement,
      url: environment.apiUrl + '/v3/api-docs',
      deepLinking: true,
      requestInterceptor: this.requestInterceptor,
      withCredentials: true,
      presets: [SwaggerUI.presets.apis],
    });
  }

  requestInterceptor = (request: HttpRequest<any>) => {
    request.headers.set('content-type', 'application/json');
    let token = this.authService.token;

    if (token) {
      request.headers.set('Authorization', token);
      request.headers.set('X-XSRF-TOKEN', this.cookieService.get('XSRF-TOKEN'));
    }
    return request;
  };
}
