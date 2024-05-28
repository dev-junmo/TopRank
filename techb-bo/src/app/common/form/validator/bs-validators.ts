import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function numberValidator(): ValidatorFn {
  let nameRe: RegExp = new RegExp('^[0-9]*$', 'i');
  return (control: AbstractControl): {[key: string]: any} => {
    const result = nameRe.test(control.value);
    return result ? null: {'number': {value: control.value}};
  };
}

@Directive({
  selector: '[number]',
  providers: [{provide: NG_VALIDATORS, useExisting: BSNumberValidatorDirective, multi: true}]
})
export class BSNumberValidatorDirective implements Validator {
  
  validate(control: AbstractControl): {[key: string]: any} {
    return numberValidator()(control);
  }
}


// import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

// export function numberValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} => {
//     const result = nameRe.test(control.value);
//     return result ? {'number': {value: control.value}} : null;
//   };
// }

// @Directive({
//   selector: '[number]',
//   providers: [{provide: NG_VALIDATORS, useExisting: BSNumberValidatorDirective, multi: true}]
// })
// export class BSNumberValidatorDirective implements Validator {
//   @Input('param') param: string;

//   validate(control: AbstractControl): {[key: string]: any} {
//     return this.param ? numberValidator(new RegExp(this.param, 'i'))(control)
//                               : null;
//   }
// }

// import { Directive, forwardRef, Attribute } from '@angular/core';
// import { NG_VALIDATORS, Validator,
//          Validators, AbstractControl, ValidatorFn } from '@angular/forms';

// @Directive({
//     selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
//     providers: [
//         { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
//     ]
// })
// export class EqualValidator implements Validator {
//     constructor( @Attribute('validateEqual') public validateEqual: string) {}
 
//     validate(c: AbstractControl): { [key: string]: any } {
//         // self value (e.g. retype password)
//         let v = c.value;
 
//         // control value (e.g. password)
//         let e = c.root.get(this.validateEqual);
 
//         // value not equal
//         if (e && v !== e.value) return {
//             validateEqual: false
//         }
//         return null;
//     }
// }

