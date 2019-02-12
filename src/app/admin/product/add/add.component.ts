import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { AppConfig } from '../../../_configs/config';
import { AdminAuthenticationService } from '../../../admin/_services';
import { AdminProductService } from '../../_services/product.service';
import { Product } from '../../../_models';
import { saveAs } from 'file-saver';
import { AdminMainService } from '../../_services/main.service';

declare var $: any;

@Component({
  selector: 'app-product-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
    
    appMode: boolean = AppConfig.settings.debug;
    product: Product;

    addProduct: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    hrefParse: string [];
    mainHref: string;

    categoryName: string;
    productName: string;

    selectedFile: File;    
    selectedFileOne: File;
    selectedFileTwo: File;
    selectedFileThree: File;

    imageMainExist: boolean;
    imageOneExist: boolean;
    imageTwoExist: boolean;
    imageThreeExist: boolean;

    constructor(
        private http: HttpClient,
        private adminMainService: AdminMainService,  
        private formBuilder: FormBuilder,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private adminProductService: AdminProductService, ) {}

    ngOnInit() {
        this.addProduct = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            text: ['', Validators.required],
            locale: [''],
            enabled: ['', Validators.required],
            price: ['', Validators.required],
            quantity: ['', Validators.required],
            href: ['', Validators.required],

            discount: ['', Validators.required],
            best_saller: ['', Validators.required],
            sale: ['', Validators.required],
            alt: ['', Validators.required],

            titleBg: [''],
            descriptionBg: [''],
            textBg: [''],
            localeBg: [''],

            titleRu: [''],
            descriptionRu: [''],
            textRu: [''],
            localeRu: [''],
        });

        if(this.appMode === true){
            console.log("Initialize prodict-edit component");
        }
    }

    get f() {
        return this.addProduct.controls; 
    }

    onSubmit() {

        this.submitted = true;
        if (this.addProduct.invalid) {
            return;
        }
        this.hrefParse = this.adminMainService.parseUrl();
        if(!AppConfig.settings.localhost){
            this.categoryName = this.hrefParse[4];
            this.productName = this.f.title.value;
        }else{
            this.categoryName = this.hrefParse[3];
            this.productName = this.f.title.value;
        }

        if(this.appMode === true){
            console.log(this.categoryName);
            console.log(this.productName);
        }
        
        this.loading = true;
        let productJson;
        let href;
        let image;
        let imageOne;
        let imageTwo;
        let imageThree;
        

        if (this.imageOneExist) {
            imageOne = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFileOne.name;
            this.adminProductService.onUploadImage(this.selectedFileOne, this.categoryName, this.productName);

            image = imageOne;
        }

        if (this.imageTwoExist) {
            imageTwo = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFileTwo.name;
            this.adminProductService.onUploadImage(this.selectedFileTwo, this.categoryName, this.productName);

            image = image + ',' + imageTwo;
        }

        if (this.imageThreeExist) {
            imageThree = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFileThree.name;
            this.adminProductService.onUploadImage(this.selectedFileThree, this.categoryName, this.productName);

            image = image  + ',' + imageThree;
        }

        if (this.imageMainExist) {
            // this.onUpload();
            this.mainHref = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFile.name;              
            this.adminProductService.onUploadImage(this.selectedFile, this.categoryName, this.productName);
        }
        console.log(this.mainHref);

        let productID = null;

        productJson  = '{' +
            '"quantity"' + ":"  + '' + this.f.quantity.value + '' +',' + 
            '"price"' + ":"  + '' + this.f.price.value + '' +',' + 
            '"href"' + ":"  + '"' + this.mainHref + '"' +',' + 
            '"enabled"' + ":"  + '' + this.f.enabled.value + '' +',' + 
            '"sale"' + ":"  + '' + this.f.sale.value + '' +',' + 
            '"bestSaller"' + ":"  + '' + this.f.best_saller.value + '' +',' + 
            '"discount"' + ":"  + '' + this.f.discount.value + '' +',' + 
            '"image"' + ":"  + '"' + image + '"' +',' + 
            '"alt"' + ":"  + '"' + this.f.alt.value + '"' +',' + 

            '"text"' + ":" + '{' +
                '"en"' + ":" + '{' +
                    '"locale"' + ":"  + '"' + "en" + '"' +',' + 
                    '"title"' + ":"  + '"' + this.f.title.value + '"' +',' + 
                    '"text"' + ":"  + '"' + this.f.text.value + '"' +',' + 
                    '"description"' + ":"  + '"' + this.f.description.value + '"' +
                '}'+',' + 
                '"bg"' + ":" + '{' +
                    '"locale"' + ":"  + '"' + "bg" + '"' +',' + 
                    '"title"' + ":"  + '"' + this.f.titleBg.value + '"' +',' + 
                    '"text"' + ":"  + '"' + this.f.textBg.value + '"' +',' + 
                    '"description"' + ":"  + '"' + this.f.descriptionBg.value + '"' +
                '}'+',' + 
                '"ru"' + ":" + '{' +
                    '"locale"' + ":"  + '"' + "ru" + '"' +',' + 
                    '"title"' + ":"  + '"' + this.f.titleRu.value + '"' +',' + 
                    '"text"' + ":"  + '"' + this.f.textRu.value + '"' +',' + 
                    '"description"' + ":"  + '"' + this.f.descriptionRu.value + '"' +
                '}'+ 
            '}'+
        '}';
   
        if(this.appMode === true){
            console.log(image);
            console.log(productJson);
        }

        this.adminProductService.addProduct(JSON.parse(productJson), this.categoryName);    

    }

    onFileChanged(event){

        this.selectedFile = <File>event.target.files[0];
        this.imageMainExist = true;
        if(this.appMode === true){
            console.log(event);
            console.log( event.target.files[0]);
        }

        this.selectedFile = <File>event.target.files[0];
    }

    onFileChangedOne(event){

        this.selectedFileOne = <File>event.target.files[0];
        this.imageOneExist = true;
        if(this.appMode === true){
            console.log(event);
            console.log( event.target.files[0]);
            console.log(this.selectedFileOne.name);
        }
        
    }

    onFileChangedTwo(event){

        this.selectedFileTwo = <File>event.target.files[0];
        this.imageTwoExist = true;
        if(this.appMode === true){
            console.log(event);
            console.log( event.target.files[0]);
            console.log(this.selectedFileTwo.name);
        }
    }

    onFileChangedThree(event){

        this.selectedFileThree = <File>event.target.files[0];
        this.imageThreeExist = true;
        if(this.appMode === true){
            console.log(event);
            console.log( event.target.files[0]);
            console.log(this.selectedFileThree.name);
        }
    }
}