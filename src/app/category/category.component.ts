import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AppConfig } from '../_configs/config';
import { Category } from '../_models';
import { CategoryService, SharedService } from '../_services';

declare var $: any;

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

    appMode: boolean = AppConfig.settings.debug;
    lang: string = "en";

    categories: Category[] = [];

    constructor(private categoryService: CategoryService, 
                private router: Router, 
                private activatedRoute: ActivatedRoute,
                private _loadingBar: SlimLoadingBarService,
                private sharedService: SharedService ) {
        this.lang = Cookie.get('shopLang');
        this.sharedService.currentLang.subscribe(lang=> this.lang = lang);
        // this.loadScript('assets/js/popper.js', 'popper');
        this.loadScript('assets/js/category.js', 'productSlider');
    }

	ngOnInit() {
        $('.someBlock').preloader({});
        $(".ng2SlimLoadingBar").css("display" , "block");
        this._loadingBar.start();

        if(this.appMode === true){
            console.log("Category component - begin");
            console.log("start get all categories");
        }

        this.categories = this.activatedRoute.snapshot.data['category'];

        if(this.appMode === true){
            console.log(this.categories);
            console.log("Category component - end");
         
        }
            this._loadingBar.stop();
            this._loadingBar.complete();
            $(".ng2SlimLoadingBar").css("display" , "none");
        
        setTimeout( function() {
           
            $('.someBlock').preloader('remove');

        }, 1000);
	}

	createLink( linkName: string){
		linkName = linkName.toLowerCase().replace(/\s/g, "-").replace("&", "and").replace(/,/g, "-and");
		return linkName;
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
}