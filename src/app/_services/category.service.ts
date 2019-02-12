import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Resolve, Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppConfig } from '../_configs/config';
import { Category } from '../_models';
import { MainService } from './main.service';

@Injectable({
    providedIn: 'root'    
})
export class CategoryService implements Resolve<any> {

    appMode: boolean = AppConfig.settings.debug;

    constructor(private http: HttpClient, 
                private mainService: MainService,  
                private router: Router, 
                private activatedRoute: ActivatedRoute) {}

    getAll() {
        const headers = this.mainService.setAuthHeader();

        if(this.appMode === true){
            console.log("Category service getAll()");

        }

        return this.http.get<Category[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/categories/only', 
            {headers: headers});
    }

    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Category[]> {

        if(this.appMode === true){
            console.log("Category service resolve");
        }

        return this.http.get<Category[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/categories/only-noauth');
    }
}