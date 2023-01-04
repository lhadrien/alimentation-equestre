import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class SignedinGuard implements CanActivate {
  userSession: string | null = null;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.userSession = this.cookieService.get('userSession');
    
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }

}
