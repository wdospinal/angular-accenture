import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const actualDate: Date = new Date();
    const bith: Date = new Date(control.value);    
    let diff = (actualDate.getTime() - bith.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    const sol = Math.abs(Math.round(diff / 365.25));
    return sol < minAge ? { 'forbiddenAge': { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenAge]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true }]
})
export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenAge') forbiddenAge: number;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.forbiddenAge ? forbiddenAgeValidator(this.forbiddenAge)(control) : null;
  }
}

