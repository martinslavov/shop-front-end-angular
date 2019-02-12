import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AppConfig } from '../../_configs/config';

@Injectable({ providedIn: 'root' })
export class AdminAuthenticationService {
    
    appMode: boolean = AppConfig.settings.debug;

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {       
        return this.http.post<any>(AppConfig.settings.urlWebService + ':' + AppConfig.settings.portWebService + '/api/token/generate-token', { username: username, password: password })
            .pipe(map((res:any) => {
                if (res && res.token){
                            const token = res.token;
                            const helper = new JwtHelperService();
                            const decodedToken = helper.decodeToken(token);  
                            if(decodedToken.scopes == "ROLE_ADMIN"){
                                if(this.appMode === true){
                                    console.log(decodedToken.sub);
                                    console.log(decodedToken);
                                }
                                localStorage.setItem("currentAdmin", JSON.stringify({ username, token: res.token }));
                                Cookie.set("currentAdmin", token, 0.166667);
                            }else{
                                if(this.appMode === true)
                                    console.log("false");
                                return false;
                            }
                }
                 else {
                    return false;
                    // return throwError({ error: { message: 'Unauthorised' } });
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAdmin');
    }
}