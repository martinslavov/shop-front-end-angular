import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       
        let currentAdmin = Cookie.get('currentAdmin');
        if (currentAdmin) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}