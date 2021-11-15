import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralDetailsComponent } from 'src/app/common/general-components/general-details/general-details.component';

@Component({
  selector: 'fc-general-details',
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
})
export class GeneralDetailsExtendedComponent extends GeneralDetailsComponent implements OnInit {
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }
}
