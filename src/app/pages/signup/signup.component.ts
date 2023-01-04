import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { createUserWithEmailAndPassword, getAuth, UserCredential } from "@angular/fire/auth";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

export function confirmationValidator(password: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
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
  confirmation = new FormControl('', confirmationValidator(this.password));

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

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


  validate() {
    const auth = getAuth();
    if (this.email.value === null) {
      return;
    }
    createUserWithEmailAndPassword(auth, this.email.value ?? '', this.password.value ?? '')
      .then((userCredential: UserCredential) => {
        this.userService.user = userCredential.user;
        this.cookieService.set('userSession', userCredential.user.uid);
        this.route.queryParams.subscribe(params => {
          if (params['returnUrl'] !== null && params['returnUrl'] !== undefined) {
            this.router.navigate([params['returnUrl']]);
          }
          this.router.navigate(['/']);
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
}
