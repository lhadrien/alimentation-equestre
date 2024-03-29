import { Component } from '@angular/core'
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { getAuth } from '@angular/fire/auth'

export function confirmationValidator(password: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const confirmation = password.value === control.value
    return !confirmation ? { confirmation: { value: control.value } } : null
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  hide = true
  email = new FormControl('', [Validators.required, Validators.email])
  name = new FormControl('', [Validators.required])
  password = new FormControl('', [
    Validators.required,
    Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{1,}$'),
    Validators.minLength(8),
    Validators.maxLength(120),
  ])
  confirmation = new FormControl('', confirmationValidator(this.password))

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    const auth = getAuth()
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.route.queryParams.subscribe((params) => {
          if (params['returnUrl'] !== null && params['returnUrl'] !== undefined) {
            this.router.navigate([params['returnUrl']])
          }
          this.router.navigate(['/'])
        })
      }
    })
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Vous devez entrer un mot de passe'
    }
    if (this.password.hasError('minlength')) {
      return 'Il doit etre de plus de 8 caracteres'
    }
    if (this.password.hasError('maxlength')) {
      return 'Vous devez entrer un mot de passe de moins de 120 caracteres'
    }
    return this.password.hasError('pattern') ? 'majuscule, minuscule, chiffre et caractère spécial' : ''
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer un email'
    }

    return this.email.hasError('email') ? 'email non valide' : ''
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Vous devez entrer un nom ou un pseudo'
    }
    return ''
  }

  getConfirmationErrorMessage() {
    if (this.confirmation.hasError('confirmation')) {
      return 'Mots de passes différents'
    }

    return ''
  }

  async signUp(): Promise<void> {
    if (!this.email.value || !this.password.value || !this.name.value) {
      console.warn('[signUp] Form invalid or empty')
      return
    }
    this.userService.signUp(this.email.value, this.password.value, this.name.value).then(() => {
      this.route.queryParams.subscribe((params) => {
        if (params['returnUrl'] !== null && params['returnUrl'] !== undefined) {
          this.router.navigate([params['returnUrl']])
        }
        this.router.navigate(['/'])
      })
    })
  }
}
