import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AppConfig } from '../../_configs/config';
import { Category } from '../../_models';
import { AdminCategoryService } from '../_services';


declare var $: any;

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})

export class AdminCategoryComponent implements OnInit {

	categories: Category[] = [];
    appMode: boolean = AppConfig.settings.debug;

    constructor(private adminCategoryService: AdminCategoryService, 
                private router: Router, 
                private activatedRoute: ActivatedRoute,
                private _loadingBar: SlimLoadingBarService ) {}

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
}
