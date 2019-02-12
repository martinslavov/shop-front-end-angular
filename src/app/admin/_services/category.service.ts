import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';

import { AppConfig } from '../../_configs/config';
import { Category } from '../../_models';
import { AdminMainService } from '../_services/main.service';

@Injectable({
    providedIn: 'root'    
})
export class AdminCategoryService implements Resolve<any> {

    appMode: boolean = AppConfig.settings.debug;

    constructor(private http: HttpClient, 
                private adminMainService: AdminMainService,  
                private router: Router, 
                private activatedRoute: ActivatedRoute) {}

    getAll() {
        const headers = this.adminMainService.setAuthHeader();

        if(this.appMode === true){
            console.log("Category service getAll()");

        }

        return this.http.get<Category[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/categories/only', 
            {headers: headers});
    }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Category[]> {

        const headers = this.adminMainService.setAuthHeader();

        if(this.appMode === true){
            console.log("Admin Category service resolve");
        }

        return this.http.get<Category[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/categories/only', 
            {headers: headers});
    }
}