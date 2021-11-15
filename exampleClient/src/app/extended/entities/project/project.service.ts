import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/entities/project/project.service';
@Injectable({
  providedIn: 'root',
})
export class ProjectExtendedService extends ProjectService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
