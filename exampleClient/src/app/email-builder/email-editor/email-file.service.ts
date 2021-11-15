import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailFileService {
  replaceapi: string = '/api/files/';
  url = environment.apiUrl + '/docapi/file';
  constructor(private httpclient: HttpClient) {}

  uploadBlock(id, block) {
    if (block && block.file && block.file.name) {
      const fileData = new FormData();
      fileData.append('file', block.file);
      this.httpclient.put(this.url + '/' + id, fileData).subscribe((res) => {
        if (block.src) {
          block.src = this.replaceapi + id;
        }
      });
    }
  }

  uploadFile(id, file: File) {
    if (file && file.name) {
      const fileData = new FormData();
      fileData.append('file', file);
      return this.httpclient.put<any>(this.url + '/' + id, fileData);
    }
  }

  createFileMetadata(fileMetadata) {
    return this.httpclient.post<any>(this.url, fileMetadata);
  }
}
