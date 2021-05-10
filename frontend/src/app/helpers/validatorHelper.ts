import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidatorHelper {
  static cannotBeSpace(control: AbstractControl): ValidationErrors | null {
    if (control.value.length === 0) {
      return null;
    }
    if (control.value.trim().length === 0) {
      return {
        trimError: { value: 'Field cannot be filled with space' }
      };
    }
    return null;
  }
}