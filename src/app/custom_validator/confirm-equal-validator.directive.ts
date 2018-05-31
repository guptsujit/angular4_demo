import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
@Directive({
  selector: '[appConfirmEqualValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: ConfirmEqualValidatorDirective, multi: true }
  ]
})
export class ConfirmEqualValidatorDirective implements Validator {

  validate(passwordGroup:AbstractControl):{[key: string]: any}{
    //var obj = passwordGroup.get('password');
  //  console.log(obj);
  if(passwordGroup.get('password')!=null && passwordGroup.get('confirmPassword')!=null){
  var password = passwordGroup.get('password').value;
  var confirmPassword = passwordGroup.get('confirmPassword').value;
   if(password && confirmPassword && password!==confirmPassword){
    return {'notEqual' : true};
   }
   return null;
  }
}

}
