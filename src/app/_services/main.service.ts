import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AppConfig } from '../_configs/config';
import { Category } from '../_models';
import { CartQuery } from '../cart/state';

declare var jquery:any;
declare var $ :any;

@Injectable({
    providedIn: 'root'
})
export class MainService {

    appMode: boolean = AppConfig.settings.debug;
    href: string [];

    count$: Observable<number>;
    itemCount: number

    constructor(private http: HttpClient,  private router: Router, private cartQuery: CartQuery) {}

    public get authHeader(): string {


		let appUser = JSON.parse(localStorage.getItem('appUser'));
	    const helper = new JwtHelperService();
		const decodedToken = helper.decodeToken(appUser.token);	
		const expirationDate = helper.getTokenExpirationDate(appUser.token);
		const isExpired = helper.isTokenExpired(appUser.token);
        if(this.appMode === true){
            console.log(decodedToken);
            let appUser = Cookie.get('appUser');
            console.log(appUser);
        }

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

    public linkToNameCapital( linkName: string){
       return this.capitalizeFirstLetter(linkName.replace(/\-/g," ").replace("and", "&"));
    }

    public linkToName( linkName: string){
       // return  linkName.replace(" and", " &").replace(/\-/g," ");
       return linkName.replace("-and", "-&").replace(/\-/g," ");
    }

    public nameToLink( name: string){
        name = name.toLowerCase().replace(/\s/g, "-").replace("&", "and").replace(/,/g, "-and");
        return name;
    }

    public capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public changeCartColorAndNumberFixBugMobileVersion(){

        this.count$ = this.cartQuery.selectCount();
        this.count$.subscribe((item: number) => {
            this.itemCount = item;
        });

        if (this.itemCount > 0) {
            if(this.appMode === true)
                console.log("this.itemCount > 0");
            $('#mobile-nav ul li a#lCart').css("color","red");
            $('#mobile-nav ul li a#lCart .badge').text(this.itemCount);
        }else{
            if(this.appMode === true)
                console.log("this.itemCount = 0");
            $('#mobile-nav ul li a#lCart').css("color","white");
            $('#mobile-nav ul li a#lCart .badge').text("0");
        }
    }

    public dateToNumber( date: string ){
        var dateToNumbers = date.substring(0, 10) + date.substring(13, 21)
        return  Number(dateToNumbers.replace(/\-/g,"").replace(/\:/g,""));
    }
}