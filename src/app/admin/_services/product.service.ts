import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { catchError, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import { AppConfig } from '../../_configs/config';
import { AdminMainService } from '../_services/main.service';
import { Product, Category } from '../../_models';

@Injectable({
	providedIn: 'root'
})
export class AdminProductService implements Resolve<any> {

    productSource: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    allProduct = this.productSource.asObservable();

    product: Observable<Product[]>;
    findedProduct: Product;
    urlPath: string [];
    categoryName: string ;
    appMode: boolean = AppConfig.settings.debug;

    constructor(private http: HttpClient, 
                private adminMainService: AdminMainService, 
                private router: Router, 
                private activatedRoute: ActivatedRoute,) {}

    // resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Product[]> {
    resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<Product[]> {
       
        const headers = this.adminMainService.setAuthHeader();

        if(this.appMode === true){
            console.log("Product service resolve");
            console.log(activatedRouteSnapshot.params['categoryName']);
        }

        this.categoryName =  this.adminMainService.linkToName( activatedRouteSnapshot.params['categoryName'] );
        this.product =  this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/category-name/all' + '/' + this.categoryName, 
            {headers: headers});

        this.product.subscribe(product => {
                this.setProducts(product);
        });
        
        return this.product;
    }

    public getProducts() {
        if(this.appMode === true)
            console.log("Get all products");
        return this.allProduct;
    }

    public getProductsId(id: number) {
        if(this.appMode === true)
            console.log("Get all products by id");
        this.allProduct.subscribe((product:any) => {
                    if(this.appMode === true)    
                         console.log(product.find(p => p.id == id));            
                   this.findedProduct = product.find(p => p.id == id); 

                }   
            );

        return this.findedProduct;
    }

    public setProducts(products: Product[]): void {
        if(this.appMode === true)
            console.log("Set all products");
        this.productSource.next(products);
    }

    getAll() {
        const headers = this.adminMainService.setAuthHeader();
        return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/active', 
            {headers: headers});
    }


    updateProduct( productJson: string, categoryName: string){
        const headers = this.adminMainService.setAuthHeader();
        return this.http.put(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products?categoryName=' + categoryName, 
            productJson,
            {headers: headers}).subscribe(
                    res => {                   
                        return res;
                        },
                    err => {
                      console.log("Error occured - can't get token" + err);
                      console.log(err);
                    }
                    );
    }

    getProductById(id: number){
        const headers = this.adminMainService.setAuthHeader();
        return this.http.get<Product[]>(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products/' + id, 
            {headers: headers});
    }

    addProduct(productJson: any, categoryName: string){
        const headers = this.adminMainService.setAuthHeader();
        return this.http.post(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + '/api/products?categoryName=' + categoryName, 
            productJson,
            {headers: headers}).subscribe(
                    res => {                   
                        return res;
                        },
                    err => {
                      console.log("Error occured - can't get token");
                    }
                    );
    }

    removeProduct(id: number, enabled: boolean, productId: number) {
        const headers = this.adminMainService.setAuthHeader();
        this.http.put(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + "/api/products/2/disable-enable", 
                               {
                "id": productId,
                "enabled": enabled
            }, {headers: headers})
                .subscribe(
                    res => {
                        return res;
                        },
                    err => {
                      console.log("Error occured - can't get token");
                });
    }

    deleteProduct( productId: number) {
        const headers = this.adminMainService.setAuthHeader();
        this.http.delete(AppConfig.settings.urlWebService + ':'
            + AppConfig.settings.portWebService + "/api/products/" + productId, {headers: headers}).subscribe(
                    res => {
                        return res;
                        },
                    err => {
                      console.log(err);
                      console.log("Error occured - can't get token");
                });
    }

    deleteProductImage(categoryName: string, productName: string){

        this.http.post(AppConfig.settings.urlWebSiteImage + 'delete.php' + '?category=' + categoryName + '&product=' + productName, '' )
            .subscribe((res:any) => {
                if(this.appMode === true)
                    console.log(res.status);
               if (res.status == true) {

                   this.router.navigate(['/admin/category/' +  this.categoryName]);  
                   
               }
            });
    }


    editProductImage(selectedFile: File, categoryName: string, productName: string, imageName: string) {
          
        const uploadData = new FormData();
        uploadData.append('file', selectedFile  );

        this.http.post(AppConfig.settings.urlWebSiteImage + 'edit.php' + '?category=' + categoryName + '&product=' + productName
             + '&image=' + imageName, uploadData)
            .subscribe(res => {
               if(this.appMode === true)                
                   console.log(res);
               if (res == true) {
               }
            });
    }

    onUploadImage(selectedFile: File, categoryName: string, productName: string) {
          
        const uploadData = new FormData();
        uploadData.append('file', selectedFile  );

        this.http.post(AppConfig.settings.urlWebSiteImage + 'upload.php' + '?category=' + categoryName + '&product=' + productName, uploadData)
            .subscribe(res => {
               if(this.appMode === true)                
                   console.log(res);
               if (res == true) {
               }
            });
    }

    deleteProductSingleImage(categoryName: string, productName: string, imageName: string) {

        this.http.post(AppConfig.settings.urlWebSiteImage + 'deleteSingleImage.php' + '?category=' + categoryName + '&product=' + productName
             + '&image=' + imageName, '')
            .subscribe(res => {
               if(this.appMode === true)                
                   console.log(res);
               if (res == true) {
               }
            });
    }
}

