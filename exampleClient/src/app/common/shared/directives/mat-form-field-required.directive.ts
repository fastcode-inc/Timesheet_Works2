import { Directive, ChangeDetectorRef, ContentChild, AfterViewInit } from '@angular/core';
import { FormControl, NgControl, AbstractControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

export abstract class CustomMatFormFieldNgControl extends NgControl {
  form?: AbstractControl;
}
export abstract class CustomMatFormFieldControl<T> extends MatFormFieldControl<T> {
  required: boolean;
  ngControl: CustomMatFormFieldNgControl;
}

@Directive({
  selector: 'mat-form-field',
})
export class MatFormFieldRequiredDirective implements AfterViewInit {
  @ContentChild(MatFormFieldControl, { static: false }) _control: CustomMatFormFieldControl<any>;

  constructor(private _cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this._control && this._control.ngControl) {
      const { ngControl } = this._control;
      const validator = ngControl.form // [formControl] standalone
        ? ngControl.form.validator
        : ngControl.control // formControlName in FromGroup
        ? ngControl.control.validator
        : null;
      if (validator) {
        Promise.resolve().then(() => {
          this._control.required = !!(validator(new FormControl()) || {}).required; // thx @kwkelly
          this._cdRef.markForCheck();
        });
      }
    }
  }
}
