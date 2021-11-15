import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralListComponent } from 'src/app/common/general-components/general-list/general-list.component';

@Component({
  selector: 'fc-general-list',
  templateUrl: './general-list.component.html',
  styleUrls: ['./general-list.component.scss'],
})
export class GeneralListExtendedComponent extends GeneralListComponent implements OnInit {
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }
}
