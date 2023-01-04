import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email.value ?? '', this.password.value ?? '')
      .then((userCredential) => {
        this.userService.user = userCredential.user;
        this.cookieService.set('userSession', userCredential.user.uid);
        this.route.queryParams.subscribe(params => {
          console.log(params['returnUrl']);
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
      });
  }
}
