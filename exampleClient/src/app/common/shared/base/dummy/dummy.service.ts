import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDummy } from './idummy';
import { GenericApiService } from '../generic-api.service';

@Injectable({
  providedIn: 'root',
})
export class DummyService extends GenericApiService<IDummy> {
  constructor(private httpclient: HttpClient) {
    super(httpclient, 'dummy');
  }
}

@Injectable({
  providedIn: 'root',
})
export class ParentService extends GenericApiService<IDummy> {
  constructor(private httpclient: HttpClient) {
    super(httpclient, 'parent');
  }
}
