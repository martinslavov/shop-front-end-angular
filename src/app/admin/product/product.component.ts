import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../_configs/config';
import { Product } from '../../_models';
import { AdminMainService, AdminProductService } from '../_services';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class AdminProductComponent implements OnInit {

	products: Product[] = [];
 	href: string []  ;
    appMode: boolean = AppConfig.settings.debug;
    dataSource = [];  
    msg = "";
    nCnt: number = 0;

    categoryName:string;
    hrefParse: string [];
    routeParams;

  	constructor(private adminProductService: AdminProductService, 
                private router: Router, 
                private http: HttpClient, 
                private adminMainService: AdminMainService, 
                private activatedRoute: ActivatedRoute,
                private _loadingBar: SlimLoadingBarService ) { }

  	ngOnInit() {
        this.products = this.activatedRoute.snapshot.data['product'];
        this.hrefParse = this.adminMainService.parseUrl();
        if(this.appMode === true){
            console.log("Initialize prodict component");
		    console.log(this.products);
        }
    }

    removeProduct(id: number, enabled: boolean, productId: number) {

        const headers = this.adminMainService.setAuthHeader();
        (enabled === true) ? enabled = false  : enabled = true;
        this.products[id].enabled = enabled

        let result ;
        result = this.adminProductService.removeProduct(id, enabled, productId);
    }

    deleteProduct( productId: number, productName: string) {

        const headers = this.adminMainService.setAuthHeader();
        let result;
        result = this.adminProductService.deleteProduct( productId );
        this.adminProductService.deleteProductImage( AppConfig.settings.localhost ? this.categoryName = this.hrefParse[3] : this.categoryName = this.hrefParse[4], productName);
        if(this.appMode === true){
            console.log(AppConfig.settings.localhost ? this.categoryName = this.hrefParse[3] : this.categoryName = this.hrefParse[4]);
            console.log(productName);
        }
    }

    createLink( linkName: string){
        linkName = linkName.toLowerCase().replace(/\s/g, "-").replace("&", "and").replace(/,/g, "-and");
        return "product/" + linkName;
    }

    onEdit(id: number) {
        console.log(id-1);
        this.dataSource.push(this.dataSource.length);
    }
}