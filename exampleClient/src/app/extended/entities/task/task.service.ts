import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from 'src/app/entities/task/task.service';
@Injectable({
  providedIn: 'root',
})
export class TaskExtendedService extends TaskService {
  constructor(protected httpclient: HttpClient) {
    super(httpclient);
    this.url += '/extended';
  }
}
