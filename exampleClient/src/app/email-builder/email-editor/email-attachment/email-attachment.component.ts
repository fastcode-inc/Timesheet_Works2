import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'lib-email-attachment',
  templateUrl: './email-attachment.component.html',
  styleUrls: ['./email-attachment.component.css'],
})
export class EmailAttachmentComponent {
  @Input() files: Set<File> = new Set();
  filesMap = new Map();
  name: string = '';
  file: any;
  @Output() onAttachmentAdd = new EventEmitter<Set<File>>();

  constructor(private http: HttpClient) {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      for (let key in event.target.files) {
        if (!isNaN(parseInt(key))) {
          this.files.add(event.target.files[key]);
          this.setFileUri(event.target.files[key]);
        }
      }
      this.onAttachmentAdd.emit(this.files);
    }
  }

  setFileUri(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.filesMap.set(file, reader.result);
    };
  }

  removeFile(file: File) {
    this.files.delete(file);
    this.onAttachmentAdd.emit(this.files);
  }
}
