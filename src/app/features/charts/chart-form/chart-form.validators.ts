import {AbstractControl} from "@angular/forms";

export function isAllowedCountry(control: AbstractControl) {
  if (control.value.trim().toLowerCase() === 'mexico'
    || control.value.trim().toLowerCase() === 'sweden'
    || control.value.trim().toLowerCase() === 'new zealand'
    || control.value.trim().toLowerCase() === 'thailand') {
    return null
  }
  return {notAllowedCountry: true};
}