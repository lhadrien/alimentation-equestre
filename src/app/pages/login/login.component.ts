import { Component } from '@angular/core';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "@angular/fire/auth";
import { FormControl, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Firestore } from "@angular/fire/firestore";

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
    private cookieService: CookieService,
    private afs: Firestore
  ) {}

  async login() {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
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
    }
  }
}
