import { ChangeDetectionStrategy, Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AppConfig } from '../_configs/config';
import { CartItem, CartQuery, CartService } from './state';
import { Product } from '../product/state';
import { MainService } from '../_services';
import { SharedService } from '../_services/shared.service';
import { PdfGeneratorComponent } from '../_utils/pdf-generator/pdf-generator.component';
import { TranslateService } from '../_utils/translate/translate.service';

declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'app-cart',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent extends PdfGeneratorComponent implements OnInit {

    appMode: boolean = AppConfig.settings.debug;
    lang: string = "en";
    lang$: Observable<string>;

    items$: Observable<(CartItem & Product)[]>;
    total$: Observable<number>;
    total: number;

    isOpen: boolean = true;

    constructor(private cartQuery: CartQuery, 
                private cartService: CartService, 
                private router: Router,
                private mainService: MainService,
                private translateService: TranslateService,
                private sharedService:SharedService) {
        super();
        this.lang = Cookie.get('shopLang');
        this.sharedService.currentLang.subscribe(lang=> this.lang = lang);
    }

    ngOnInit() {
        this.items$ = this.cartQuery.selectItems$;
        this.total$ = this.cartQuery.selectTotal$;
    }

    /**
    *
    * @param {ID} productId
    */
    remove({ productId }: CartItem) {
        $.iaoAlert({msg: "The product has been removed from cart",
                        type: "error",
                        mode: "dark",})
        
        this.cartService.remove(productId);
        this.mainService.changeCartColorAndNumberFixBugMobileVersion();
    }

    /**
    *
    * @param {ID} id
    */
    addProductToCart({ id }: Product) {
          $.iaoAlert({msg: "The product has been added to cart",
                type: "success",
                mode: "light",});

        this.cartService.addProductToCart(id);
    }

    /**
    *
    * @param {ID} id
    */
    subtract({ id }: Product) {

        $.iaoAlert({msg: "The product has been removed from cart",
                type: "error",
                mode: "dark",})

        this.cartService.subtract(id);
        this.mainService.changeCartColorAndNumberFixBugMobileVersion();
    }

    redirect(popup: boolean){

        $("#messageBox").slideUp("slow");
        this.router.navigate(['/cart']);

        return false;
    }
}