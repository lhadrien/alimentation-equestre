import { Component } from '@angular/core';
import { browserLocalPersistence, getAuth, signInWithEmailAndPassword } from "@angular/fire/auth";
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

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  async login() {
    if (this.email.invalid || this.password.invalid) {
      return;
    }
    const auth = getAuth();
    await auth.setPersistence(browserLocalPersistence);
    try {

      const user = await signInWithEmailAndPassword(auth, this.email.value ?? '', this.password.value ?? '');
      this.userService.user = user;
      this.cookieService.set('userSession', user.user.uid);
      await this.userService.getFirebaseUser(user.user.uid);
      this.route.queryParams.subscribe(params => {
        if (params['returnUrl'] !== null && params['returnUrl'] !== undefined) {
          this.router.navigate([params['returnUrl']]);
        }
        this.router.navigate(['/']);
      });
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
      console.log(error);
    }
  }
}
