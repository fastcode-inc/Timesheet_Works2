import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FieldsComponent } from 'src/app/common/general-components/fields/fields.component';

@Component({
  selector: 'fc-fields-extended',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsExtendedComponent extends FieldsComponent implements OnInit {
  constructor(public formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit() {}
}
