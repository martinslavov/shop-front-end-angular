import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/pairwise';

declare var jquery:any;
declare var $ :any;

import { IBreadcrumb } from '../../_models';
import { MainService } from '../../_services';
import { AppConfig } from '../../_configs/config';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
	
	appMode: boolean = AppConfig.settings.debug;
	message: string;
	breadcrumbs: IBreadcrumb[];
	path: string;
	text: string;
	length: number;
	pathLength: string[];
	href: string [];
	
	constructor(private router: Router,
				private mainService: MainService) {
	}

	ngOnInit() {

		this.router.events
			.subscribe((event) => {
				if (event instanceof NavigationEnd) {
			  		this.path = event.url;
			  		if(this.appMode === true)
			  			console.log(this.path);
					this.createBreadcrumb(this.path);
				}
			});
		if(this.appMode === true)
			console.log(this.breadcrumbs);
	}

	createBreadcrumb(path: string){
		
		this.breadcrumbs = [];
		this.breadcrumbs = [{
			id: 0,
			parentId: 0,
			path: "/",
			text: "Shop",
			active: true,
		}]

		this.pathLength = path.split('/');
		for(var i = 1; i < this.pathLength.length; i++){
			var currentPath = "";
			for(var j = 0; j < i; j++){
				currentPath += "/"  + this.pathLength[j+1];
			}

			this.text = this.mainService.linkToNameCapital(this.pathLength[i]);
			if (i == this.pathLength.length - 1 || this.text == "Products"){
				var status = false;
			}else{
				var status = true;
			}

		    this.breadcrumbs.push({ id: i , parentId: i-1, path: currentPath, text: this.text,	active: status });
		}


		this.href = window.location.pathname.split("/");
		if (this.href[this.href.length-1] != "cart") {
			$("#li-shop").addClass("active");
			$("#li-cart").removeClass("active");
		}else{
			$("#li-shop").removeClass("active");
			$("#li-cart").addClass("active");
		}

		if(this.appMode === true){
			console.log(this.breadcrumbs);
			console.log(this.href[this.href.length-1]);
		}
	}
}