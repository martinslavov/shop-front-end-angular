import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AppConfig } from '../../_configs/config';
import { Category } from '../../_models';

@Injectable({
    providedIn: 'root'
})
export class AdminMainService {

    appMode: boolean = AppConfig.settings.debug;
    href: string [];

    constructor(private http: HttpClient,  private router: Router,) {}

    public get authHeader(): string {

		let appUser = JSON.parse(localStorage.getItem('currentAdmin'));
	    const helper = new JwtHelperService();
		const decodedToken = helper.decodeToken(appUser.token);	
		const expirationDate = helper.getTokenExpirationDate(appUser.token);
		const isExpired = helper.isTokenExpired(appUser.token);
        if(this.appMode === true)
            console.log(decodedToken);

	    return `Bearer ${appUser.token}`
	}

    public setAuthHeader(): HttpHeaders {
        return new HttpHeaders({'Content-Type': 
            'application/json'}).set('Authorization', this.authHeader);
    }

    public parseUrl(){
        this.href = window.location.pathname.split("/");
        return this.href;
    }

    public linkToName( linkName: string){
       return  linkName.replace(/\-/g," ").replace("and", "&");
    }
}