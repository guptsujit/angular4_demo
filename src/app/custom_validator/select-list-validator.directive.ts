import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appSelectListValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: SelectListValidatorDirective, multi: true }
  ]
})
export class SelectListValidatorDirective implements Validator {

  validate(departmentControl: AbstractControl): { [key: string]: any } {

    let optionValue = departmentControl.value;
    if (!parseInt(optionValue)) {
      return { 'defaultSelected': true }
    }
    return null;
  }

}
