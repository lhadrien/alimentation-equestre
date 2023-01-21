import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router'
import { getAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required])

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

  async login() {
    if (this.email.invalid || this.password.invalid || !this.email.value || !this.password.value) {
      console.warn('[login] Form invalid or empty')
      return
    }
    this.userService.signIn(this.email.value, this.password.value).then()
    this.route.queryParams.subscribe((params) => {
      if (params['returnUrl'] !== null && params['returnUrl'] !== undefined) {
        this.router.navigate([params['returnUrl']])
      }
      this.router.navigate(['/'])
    })
  }
}
