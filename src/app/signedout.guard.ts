import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { UserService } from './services/user.service'

@Injectable({
  providedIn: 'root',
})
export class SignedoutGuard implements CanActivate {
  userSession: string | null = null

  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userService.idUser) {
      this.router.navigate(['/']).then()
      return false
    }
    return true
  }
}
