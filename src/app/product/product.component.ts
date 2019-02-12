import { Component, OnInit, Input, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { first } from 'rxjs/operators';
import { startWith, switchMap } from 'rxjs/operators';
import { Options, ChangeContext, PointerType  } from 'ng5-slider';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AppConfig } from '../_configs/config';
import { PaginationComponent, FilterSliderComponent } from '../_utils';
import { TranslateService } from '../_utils/translate/translate.service';
import { MainService, SharedService, ProductService} from '../_services';
import { ContainerBasedQuery, ContainerBasedService, ContainerBasedStore } from '../_state';
import { ProductStore } from './state/product.store';
import { CartStore } from '../cart/state/cart.store';
import { CartService } from '../cart/state';
import { ProductQuery } from './state';
import { Product, Category } from '../_models';

declare var jquery:any;
declare var $ :any;

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.css'],
    providers: [ContainerBasedService, ContainerBasedStore, ContainerBasedQuery],
})
export class ProductComponent extends PaginationComponent implements OnInit, FilterSliderComponent{
    
    appMode: boolean = AppConfig.settings.debug;
    lang: string = "en";

	products: Product[] = [];
 	href: string []  ;
    searchTerm: string;
    priceDiscounted: number;

    //config pipe
    path: string[] = ['company'];
    order: number = 1; // 1 asc, -1 desc;

   //filter slider config
    minValue: number = 0;
    maxValue: number = 4000;
    logText: string = '';
    
    options: Options = {
        getSelectionBarColor: (value: number): string => {
            // if (value <= 100)
            //     return 'yellow';

            if (value <= 500)
                return 'orange';
                  
            return '#dc3545';
        },
        getPointerColor: (value: number): string => {
            return '#dc3545';
        },
        floor: 0,
        ceil: 10000,
        translate: (value: number): string => {
          return '€' + value;
        },
        combineLabels: (minValue: string, maxValue: string): string => {
          return 'from ' + minValue + ' up to ' + maxValue;
        }
    };

    constructor(private productService: ProductService, 
                private router: Router, 
                private activatedRoute: ActivatedRoute,
                private _loadingBar: SlimLoadingBarService,
                private containerBasedService: ContainerBasedService,
                private cartService: CartService, 
                private productsQuery: ProductQuery,
                private productStore: ProductStore,
                private cartStore: CartStore,
                private mainService: MainService,
                private translateService: TranslateService,
                private sharedService: SharedService
                 ) {
        super();
    	this.href = this.router.url.split("/");
        this.lang = Cookie.get('shopLang');
        this.sharedService.currentLang.subscribe(lang=> this.lang = lang);

        if(this.appMode === true){
            console.log(translateService.data);
            console.log("Lang from cookie: " + Cookie.get('shopLang'));
            console.log(this.lang);
        }
    }

    onChanhePageLoadJs(){            
        // this.unLoadScript('pagination');
        // this.loadScript('assets/js/products.js', 'pagination');
    }

	ngOnInit(): void {

        $('.someBlock').preloader({});
        $(".ng2SlimLoadingBar").css("display" , "block");
        this._loadingBar.start();

        if(this.appMode === true){
            console.log("Product component - begin");
            console.log("start get all products");
        }

        this.products = this.activatedRoute.snapshot.data['product'];
        this.productService.setProducts(this.products);
        //add to product store
        this.productStore.set(this.products);

        // this.loadScript('assets/js/products.js', 'pagination');
        if(this.appMode === true){
            console.log(this.products);
            console.log("Product component - end");
         
        }
    
        this._loadingBar.stop();
        this._loadingBar.complete();    
        $(".ng2SlimLoadingBar").css("display" , "none");
        $('.someBlock').preloader('remove');
 	}

 	createLink( linkName: string){
		linkName = linkName.toLowerCase().replace(/\s/g, "-").replace("&", "and").replace(/,/g, "-and");
		return "products/" + linkName;
	}

    /**
    *
    * @param {ID} id
    */
    addProductToCart($event,{ id }: Product, product: Product) {

        $.iaoAlert({msg: "The product has been added to cart",
        type: "success",
        mode: "light",});
        
        if(this.appMode === true){
            console.log("Add product with " + id + " to cart ");
            console.log(product);
        }
        this.cartService.addProductToCart(id);
        this.mainService.changeCartColorAndNumberFixBugMobileVersion();
    }

    /**
    *
    * @param {ID} id
    */
    subtract({ id }: Product) {
        if(this.appMode === true)
            console.log("Remove product with " + id + " from cart ");
        this.cartService.subtract(id);
    }

    onUserChange(changeContext: ChangeContext): void {
        this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
        if(this.appMode === true)
            console.log(this.logText);
    }

    getChangeContextString(changeContext: ChangeContext): string {
        return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
           `value: ${changeContext.value}, ` +
           `highValue: ${changeContext.highValue}}`;
    }

    //config for pipe all
    sortTable(prop: string, highest: boolean) {
        this.path = prop.split('.')
        if (highest) {
            this.order = -1; // change order
        }else{
            // this.order = this.order * (-1);
            this.order = 1;
        }

        if(this.appMode === true){
            console.log(prop);
            console.log(highest);
            console.log(this.path);
            console.log(this.order);
        }
        return false; // do not reload
    }

    calculateDiscount( price: number, discount: number){
        this.priceDiscounted = (price/100)*discount;
        if(this.appMode === true){
            // console.log(price);
            // console.log(discount);
        }

        return (price - this.priceDiscounted).toFixed(2);
    }

    setLang(lang: string) {
        if(this.appMode === true)
            console.log(lang);
        this.translateService.use(lang);
    }
}