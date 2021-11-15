import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/entities/customer/customer.service';
@Injectable({
  providedIn: 'root',
})
export class CustomerExtendedService extends CustomerService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
