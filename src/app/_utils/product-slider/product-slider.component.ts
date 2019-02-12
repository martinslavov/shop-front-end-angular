import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AppConfig } from '../../_configs/config';
import { Product } from '../../_models';
import { CartService } from '../../cart/state';
import { ProductService, MainService } from '../../_services';
import { ProductSliderOnSalePipe, ProductSliderBestSallerPipe, ProductSliderNewestPipe, ProductSortPipe } from '../../_pipes';
import { SharedService } from '../../_services/shared.service';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'app-product-slider',
    templateUrl: './product-slider.component.html',
    styleUrls: ['./product-slider.component.css']
})
export class ProductSliderComponent implements OnInit {

    appMode: boolean = AppConfig.settings.debug;
    lang: string = "en";

	products: Product[] = [];
    path: string[] = ['company'];
    order: number = 1; // 1 asc, -1 desc;

	productType: string = 'productSale';
	productSlider: Product[] = [];

    productsOnSale: Product[] = [];
    productNewest: Product[] = [];
    productBest: Product[] = [];

    priceDiscounted: number;

    @ViewChild('myCarousel') myCarousel: NguCarousel<any>;
    public carouselConfig: NguCarouselConfig = {
        grid: { xs: 1, sm: 2, md: 4, lg: 4, all: 0 },
        // slide: 4,
        speed: 250,
        point: {
            visible: true
        },
        load: 2,
        velocity: 0,
        touch: true,
        loop: true,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
        // interval: { timing: 5500 },
        animation: 'lazy'
    };    

    constructor(private productService: ProductService,
    			private cartService: CartService,
                private mainService: MainService,
                private sharedService:SharedService ) {
        this.lang = Cookie.get('shopLang');
        this.sharedService.currentLang.subscribe(lang=> this.lang = lang);
    }
    ngOnInit() {
    	this.productService.allProduct.subscribe(
                products => {
                    this.productSlider = products;
                    this.productNewest = products;
                }
            );


        this.productsOnSale = new ProductSliderOnSalePipe().
            transform( this.productSlider, "on sale" );
        this.productBest = new ProductSliderBestSallerPipe().
            transform( this.productSlider, "best seller" );
        this.productNewest = new ProductSortPipe().
            transform( this.productSlider, ['created'], -1 );

        this.productSlider = this.productsOnSale;
        if(this.appMode === true){
            console.log(this.productsOnSale);
            console.log(this.productBest);
        }
    }

    changeSlider(changeProductType: string){
        this.moveTo(0);
    	if (changeProductType == 'productNewest') {
            if(this.appMode === true){
                console.log("productNewest");
                console.log(this.productNewest);
            }
    		this.productType = 'productNewest'
    		this.productSlider = this.productNewest;
    	}else if (changeProductType == 'productSale') {
            if(this.appMode === true){
                console.log("productSale");
                console.log(this.productsOnSale);
            }
            this.productType = 'productSale'
    		this.productSlider = this.productsOnSale;
    	}else if (changeProductType == 'productBest') {
            if(this.appMode === true){
                console.log("productBest");
                console.log(this.productBest);
            }
            this.productType = 'productBest'
    		this.productSlider = this.productBest;
    	}

    }

    moveTo(slide: number) {
        this.myCarousel.moveTo(slide);
    }

    addProductToCart($event, product: Product) {

        $.iaoAlert({msg: "The product has been added to cart",
        type: "success",
        mode: "light",});

        if(this.appMode === true)
            console.log("Add product to cart" + product);
        
        this.cartService.addProductToCart(product.id);
        this.mainService.changeCartColorAndNumberFixBugMobileVersion();
    }

    createUrlPath(linkName: string){

        linkName = linkName.toLowerCase().replace(/\s/g, "-").replace("&", "and").replace(/,/g, "-and");
        return "products/" + linkName;

    }

    calculateDiscount( price: number, discount: number){
        this.priceDiscounted = (price/100)*discount;
        return (price - this.priceDiscounted).toFixed(2);
    }
}