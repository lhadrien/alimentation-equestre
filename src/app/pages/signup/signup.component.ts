import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function confirmationValidator(password: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('control value', control.value);
    console.log('password value', password.value);
    const confirmation = password.value === control.value;
    return !confirmation ? {confirmation: {value: control.value}} : null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$'),
    Validators.minLength(8),
    Validators.maxLength(120),
  ]);
  confirmation = new FormControl('', confirmationValidator(this.password))
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Vous devez entrer un mot de passe';
    }
    if (this.password.hasError('minlength')) {
      return 'Il doit etre de plus de 8 caracteres';
    }
    if (this.password.hasError('maxlength')) {
      return 'Vous devez entrer un mot de passe de moins de 120 caracteres';
    }
    console.log(this.password);
    return this.password.hasError('pattern') ? 'majuscule, minuscule, chiffre et caractère spécial' : '';
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer un email';
    }

    return this.email.hasError('email') ? 'email non valide' : '';
  }
  getConfirmationErrorMessage() {
    if (this.confirmation.hasError('confirmation')) {
      return 'Mots de passes différents';
    }

    return '';
  }

}
