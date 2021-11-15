import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  static digit: number = 1;
  constructor() {}

  static integer(control: AbstractControl) {
    const num = Number(control.value);
    var reg = /^[0-9]\d*$/;
    var isValid = !isNaN(num) && reg.test(num.toString());
    const message = {
      integer: {
        message: 'Should be valid integer.',
      },
    };
    return isValid ? null : message;
  }

  static sqlQuery(control: AbstractControl) {
    // var reg = /select\s+(.*)\s+from\s+(.*)\s+where\s+?(.*)?/i;
    var reg = /select\s+(.*)\s+from\s+(.*)/i;

    if (!control.value) {
      return null;
    }
    var isValid = control.value && reg.test(control.value.toString());
    const message = {
      sqlQuery: {
        message: 'Please enter valid select Query',
      },
    };
    return isValid ? null : message;
  }

  static emailValidation(control: AbstractControl) {
    var reg = /^(?!\.)(?!.*\.$)(?!.*?\.\.).+@.+\..[a-zA-Z]{1,4}$/;
    if (!control.value) {
      return null;
    }
    var isValid = control.value && reg.test(control.value.toString());
    const message = {
      emailValidation: {
        message: 'Please enter your email in this format: yourname@email.com',
      },
    };
    return isValid ? null : message;
  }

  static noCommaAllowed(control: AbstractControl) {
    var reg = /^(?!\.)(?!.*\.$)(?!.*?\.\.).+@.+\..[a-zA-Z]{1,4}$/;
    if (!control.value) {
      return null;
    }
    var isValid = control.value && reg.test(control.value.toString());
    const message = {
      emailValidation: {
        message: 'Please enter your email in this format: yourname@email.com',
      },
    };
    return isValid ? null : message;
  }

  static percentageValidation(control: AbstractControl) {
    var reg = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/;
    if (!control.value) {
      return null;
    }
    var isValid = control.value && reg.test(control.value.toString());
    const message = {
      percentageValidation: {
        message: 'Please enter your percentage format: 90.23',
      },
    };
    return isValid ? null : message;
  }

  static decimalPrecision(control: AbstractControl) {
    const num = Number(control.value);

    var reg = /^\d+(\.\d{1,2})?$/;
    var isValid = !isNaN(num) && reg.test(num.toString());
    const message = {
      decimalPrecision: {
        message: 'Should be valid decimal point.', // Will changes the error defined in errors helper.
      },
    };
    return isValid ? null : message;
  }

  static websiteValidate(control: AbstractControl) {
    var reg = /^(http:\/\/|https:\/\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$/;
    if (!control.value) {
      return null;
    }
    var isValid = control.value && reg.test(control.value.toString());
    const message = {
      website: {
        message: 'This field only accepts valid websites e.g. www.abc.com .',
      },
    };
    return isValid ? null : message;
  }

  static alphanumericSpecialCharacterValidate(control: AbstractControl) {
    var reg = /^[a-zA-Z0-9-_]+$/;
    if (!control.value) {
      return null;
    }
    var isValid = control.value && reg.test(control.value.toString());
    const message = {
      alphanumericSpecialCharacterValidate: {
        message: 'This field only accepts alphanumeric characters and these symbols: - . ( ) _',
      },
    };
    return isValid ? null : message;
  }

  static decimalPrecisionTwo(control: AbstractControl) {
    const num = Number(control.value);
    var reg = /^\d+(\.\d{1,2})?$/;
    var isValid = !isNaN(num) && reg.test(num.toString());
    const message = {
      decimalPrecisionTwo: {
        message: 'Should be valid decimal point.', // Will changes the error defined in errors helper.
      },
    };
    return isValid ? null : message;
  }
}
