import { Component, OnInit } from '@angular/core';
import { UserService } from "./services/user.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'alimentation-equestre';
  shouldRun = true;

  constructor(private userService: UserService, private cookieService: CookieService) {
  }
  ngOnInit() {
    console.log('prout');
    const idUser = this.cookieService.get('userSession');
    this.userService.getFirebaseUser(idUser).then();
  }
}
