import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { AppConfig } from '../_configs/config';
import { MainService } from './main.service';
import { Product, Category } from '../_models';
import { ProductStore } from '../product/state/product.store';

@Injectable({
    providedIn: 'root'
})
export class ProductService implements Resolve<any> {

    productSource: BehaviorSubject<Product[]> = new BehaviorSubject([]);

    allProduct = this.productSource.asObservable();

    urlPath: string [];
    categoryName: string ;
    productName: string ;
    product: Observable<Product[]>;
    appMode: boolean = AppConfig.settings.debug;

    constructor(private http: HttpClient, 
                private mainService: MainService, 
                private router: Router, 
                private activatedRoute: ActivatedRoute,
                private productStore: ProductStore) {
    }

    // resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Product[]> {
    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot){
       
        const headers = this.mainService.setAuthHeader();

        if(this.appMode === true){
            console.log("Product service resolve");
            console.log(activatedRouteSnapshot.params['categoryName']);
            
        }

        this.categoryName =  this.mainService.linkToName( activatedRouteSnapshot.params['categoryName'] );

        this.product = this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/category-name' + '/' + this.categoryName, 
            {headers: headers});

        this.product.subscribe(product => {
                //add to product store
                this.productStore.set(product);
        });
        
        return this.product;
        // return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
        //     + AppConfig.settings.portWebService + '/api/products/category-name' + '/' + this.categoryName, 
        //     {headers: headers});
    }

    public getProducts() {
        return this.allProduct;
    }

    public setProducts(products: Product[]): void {
        this.productSource.next(products);
    }

    getAllActive() {
        const headers = this.mainService.setAuthHeader();
            return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/active', 
            {headers: headers});
    }

    getAll() {
        const headers = this.mainService.setAuthHeader();
        return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products', 
            {headers: headers});
    }

    getByName( productName: string ) {
        const headers = this.mainService.setAuthHeader();
        return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/product-name' + "/" + productName, 
            {headers: headers});
    }  

    getAllProductForCategoryName() {
        const headers = this.mainService.setAuthHeader();
        this.urlPath = this.mainService.parseUrl();
        this.categoryName =  this.mainService.linkToName(this.urlPath[2]);

        return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/category-name' + "/" + this.categoryName, 
            {headers: headers});
    }
}