import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { CartQuery } from '../../cart/state';
import { TranslateService } from '../../_utils/translate/translate.service';
import { SharedService } from '../../_services/shared.service';

declare var jquery:any;
declare var $ :any;

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent{
	
	clickedLang: string;
	isMobile: boolean;
	innerWidth: number ;

	count$: Observable<number>;
	itemCount: number
	// items$;

	constructor(private cartQuery: CartQuery,
				private translateService: TranslateService,
				private sharedService:SharedService) {
    	this.count$ = this.cartQuery.selectCount();
    	this.count$.subscribe((item: number) => {
		    this.itemCount = item;
		});

		this.clickedLang = Cookie.get('shopLang');

		// this.items$ = this.cartQuery.selectItems$;
		// this.cartQuery.selectItems$.subscribe((allSelectedItem:any) => {
		// 	this.items$ = allSelectedItem;
		// });

		this.loadScript('assets/js/app.js', 'popover');
		this.loadScript('assets/js/main.js', 'main-app');

		if (innerWidth <= 760) {
			this.isMobile = true;
			$('body').prepend( '<button type="button" id="mobile-cart" style="display: block;"><i class="fas fa-shopping-cart" style="color: white; margin-right:15px;" aria-hidden="true"></i> </button>' );
			$('body').prepend( '<button type="button" id="mobile-nav-toggle" style="z-index: 9999;"><i class="fa fa-bars"></i></button>' );
		}else{
			$("#mobile-cart").css("display" , "none");
			$("mobile-nav-toggle").css("display" , "none");
			this.isMobile = false;
		}
	}

	loadScript(url: string, id: string) {

        let body = <HTMLDivElement> document.body;
        let script = document.createElement('script');
        script.setAttribute("id", id);
        script.innerHTML = '';
        script.src = url;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
     }

    setLang(event:any , lang: string) {
    	this.sharedService.changeMessage(lang);
        this.translateService.use(lang);
        this.clickedLang = lang;
    }
}
