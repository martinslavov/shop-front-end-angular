import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppConfig } from '../_configs/config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(AppConfig.settings.urlWebService + ':' + AppConfig.settings.portWebService + '/api/token/generate-token', { username: username, password: password })
            .pipe(map((res:any) => {
                if (res && res.token){
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }
                 else {
                    return false;
                    // return throwError({ error: { message: 'Unauthorised' } });
                }
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}