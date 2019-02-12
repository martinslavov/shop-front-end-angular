import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NavigationCancel, Event, NavigationEnd, NavigationError, NavigationStart, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AppConfig } from './_configs/config';
import { TranslateService } from './_utils';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
	
	appMode: boolean = AppConfig.settings.debug;

	constructor(private http: HttpClient,
				private _loadingBar: SlimLoadingBarService,
				private _router: Router,
				private translate: TranslateService){
		if(this.appMode === true)
			console.log(translate.data);
		if (!Cookie.get('shopLang')){
			// 86400 second = 1 day
			Cookie.set('shopLang', 'en', 86400 );	
		}
	}

  	ngOnInit(): void {

		let result;
		let appUser = Cookie.get('appUser');
		
		if (!appUser) {
			// The Session will expire after 4 hour
			if(this.appMode === true)
				console.log("Get new toke app services");
			this.http.post(AppConfig.settings.urlWebService + ':' + AppConfig.settings.portWebService + '/api/token/generate-token', { username: "appUser", password: "mslavov" })
		        .subscribe(
		        	res => {
	 					result = res["token"];
					    if (res && result){
		                    // store username and jwt token in local storage to keep user logged in between page refreshes
		                    localStorage.setItem('appUser', JSON.stringify({ username: "appUser", token: result }));
		                   	Cookie.set('appUser', result, 0.166667);
		                    if(this.appMode === true){
		                    	console.log("localStorage set now - " + localStorage.getItem('appUser') + ";result - " + result );
		                    	console.log("Session set now - " + Cookie.get('appUser'));
		                    	console.log("end app component");
		                    }                
		                }
		                 else {
		                    console.log("ERROR");
		                    return false;
		                    // return throwError({ error: { message: 'Unauthorised' } });
		                }  

				        },
			        err => {
			        	if(this.appMode === true)
			          		console.log("Error occured - can't get token" + err);
			        }
		    );
		}	  		    
	}

	setLang(lang: string) {
    	this.translate.use(lang);
	}
}