import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { AppConfig } from '../../_configs/config';
import { Product } from '../../_models';
import { MainService, SharedService, ProductService } from '../../_services';
import { ProductFilterPipe } from '../../_pipes';
import { CartService } from '../../cart/state';
import { ProductStore } from '../state/product.store';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    
    appMode: boolean = AppConfig.settings.debug;
    lang: string = "en";

    products: Product[] = [];
    beforeFilteredProduct: Product[] = [];
    productName: string;
    arrayImages:string[];
    images:string;
    numberImages: number;
    productsObject: any[];

    //gallery plugin
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[] = [];

    constructor(private productService: ProductService,
                private router: Router, 
                private activatedRoute: ActivatedRoute,
                private _loadingBar: SlimLoadingBarService,
                private mainService: MainService,
                private cartService: CartService,
                private sharedService:SharedService,
                private productStore: ProductStore
               ) {
        this.lang = Cookie.get('shopLang');
        this.sharedService.currentLang.subscribe(lang=> this.lang = lang);
    }
    
    ngOnInit() {
        $('.someBlock').preloader({});
        $(".ng2SlimLoadingBar").css("display" , "block");
        this._loadingBar.start();

        if(this.appMode === true){
            console.log("Product component detail - begin");
            console.log("get product detail");
        }

        this.productService.allProduct.subscribe(
                products => {
                    this.beforeFilteredProduct = products;
                    if(this.appMode === true)
                        console.log("Product before filter" + this.beforeFilteredProduct);
                }
            );

        this.productName = this.mainService.linkToName( this.activatedRoute.snapshot.params['productName']);

        this.products = new ProductFilterPipe().
            transform( this.beforeFilteredProduct, this.productName );
        if(this.appMode === true){
            console.log("Get Product name:" + this.productName);
            console.log("Filtred Product:" + this.products);
        }

        // Set product into Coolkie
        // if (this.products.length == 0) {
        //     this.products = JSON.parse(Cookie.get("appUser-Product"));
        //     if(this.appMode === true){
        //         console.log("The page was reloaded the with F5");
        //         console.log(Cookie.get("appUser-Product"));
        //         console.log(JSON.parse(Cookie.get("appUser-Product")));
        //         console.log(this.products);
        //     }
        // }
        // Cookie.set('appUser-Product', JSON.stringify(this.products), 0.166667);
        // Set product into Coolkie

        if(this.products.length == 0){
            if(this.appMode === true)
                console.log("get product detail on refresh");
            this.productService.getByName( this.productName ).subscribe(
                products => {
                    this.productsObject = Array.of(products);         
                    this.products = this.productsObject; 
                    this.setImageGallery(this.products);
                    //add to product store
                    this.productStore.set(this.products);                    
                    if(this.appMode === true){
                        console.log( products );
                        console.log( this.products );    
                    }
                }
            );
        }

        if(this.appMode === true){
            console.log(this.activatedRoute.snapshot.data);
            console.log(this.products);
            console.log("Product detail component - end");
        }
    
        if (this.products == null) 
            this.router.navigate(['/category']);        

        // set image gallery
        if(this.products.length > 0){
            this.setImageGallery(this.products);
        }

        this._loadingBar.stop();
        this._loadingBar.complete();
        $(".ng2SlimLoadingBar").css("display" , "none");
        $('.someBlock').preloader('remove');
     }

    /**
    *
    * @param {ID} id
    */
    addProductToCart({ id }: Product) {
        $.iaoAlert({msg: "The product has been added to cart",
                type: "success",
                mode: "light",});

        if(this.appMode === true){
            console.log("Add product with " + id + " to cart ");
            console.log();
        }
        this.cartService.addProductToCart(id);
        this.mainService.changeCartColorAndNumberFixBugMobileVersion();
    }

    setImageGallery(products: Product[]){
        //gallery config
        this.galleryOptions = [
            {
                width: '100%',
                height: '550px',
                thumbnailsColumns: 3,
                imageAnimation: NgxGalleryAnimation.Zoom,

                preview: false,
                imageArrows: false,
                thumbnailsArrows: false
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '400px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20,

                preview: false,
                imageArrows: false,
                thumbnailsArrows: false
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false,
                imageArrows: false,
                thumbnailsArrows: false
            }
        ];
        
        if (this.products[0].image == "" || this.products[0].image == null) {
             if(this.appMode === true)
                console.log( "Images are empty" );
            this.galleryImages.push({ small: this.products[0].href, medium: this.products[0].href, big: this.products[0].href, label: products[0].text.en.title });
        }else{
            this.arrayImages = this.products[0].image.split(',');    
                if(this.appMode === true)
                    console.log(this.arrayImages);
            var number = 1;
            for (var i = 0; i < this.arrayImages.length; i++) {
                var image =  this.arrayImages[i];
                var alt = products[0].text.en.title + ' ' + number;                
                this.galleryImages.push({ small: image , medium: image, big: image, label: alt });           
                number++;
            }
        }

        if(this.appMode === true){
            console.log( this.galleryImages );
        }
    }
}