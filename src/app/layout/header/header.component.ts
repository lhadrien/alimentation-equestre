import { Component } from '@angular/core'
import { UserService } from '../../services/user.service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  getName(): string {
    return this.userService.getName()
  }

  isConnected(): boolean {
    return !!this.userService.idUser
  }

  signOut() {
    this.userService.signOut().then(() => {
      this.router.navigate(['login']).then()
    })
  }
}
