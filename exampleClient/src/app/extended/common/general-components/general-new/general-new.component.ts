import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralNewComponent } from 'src/app/common/general-components/general-new/general-new.component';

@Component({
  selector: 'fc-general-new',
  templateUrl: './general-new.component.html',
  styleUrls: ['./general-new.component.scss'],
})
export class GeneralNewExtendedComponent extends GeneralNewComponent implements OnInit {
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }
}
