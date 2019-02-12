import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppConfig } from '../_configs/config';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private router: Router) { }

    public get authHeader(): string {
		let appUser = JSON.parse(localStorage.getItem('appUser'));
	    const helper = new JwtHelperService();
		const decodedToken = helper.decodeToken(appUser.token);	
		const expirationDate = helper.getTokenExpirationDate(appUser.token);
		const isExpired = helper.isTokenExpired(appUser.token);

		if (isExpired) {
			  this.router.navigate(['/login']);
		}

	    return `Bearer ${appUser.token}`
	}

    getAll() {
		const headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', this.authHeader);
        return this.http.get<User[]>(AppConfig.settings.urlWebService + ':' + 
        							AppConfig.settings.portWebService + 
        							'/api/users', 
        							{headers: headers});
    }
}