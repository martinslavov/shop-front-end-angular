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
  selector: 'app-product-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    
    appMode: boolean = AppConfig.settings.debug;
    product: Product;

    addProduct: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';


    hrefParse: string [];
    imageForDelete: string [];

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

    imageMainForDelete: string;
    imageOneForDelete: string;
    imageTwoForDelete: string;
    imageThreeForDelete: string;

    imageOneForDeleteFullPath: string = 'false';
    imageTwoForDeleteFullPath: string = 'false';
    imageThreeForDeleteFullPath: string = 'false'; 

    removeOne: string = null;   
    removeTwo: string = null;      
    removeThree: string = null;   

    constructor(
        private http: HttpClient,
        private adminMainService: AdminMainService,  
        private formBuilder: FormBuilder,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private adminProductService: AdminProductService, ) {}

    ngOnInit() {
        this.addProduct = this.formBuilder.group({
            title: ['', Validators.required,],
            description: ['', Validators.required],
            text: ['', Validators.required],
            locale: [''],
            enabled: ['', Validators.required],
            price: ['', Validators.required],
            quantity: ['', Validators.required],
            href: [''],

            discount: ['', Validators.required],
            bestSaller: ['', Validators.required],
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

        this.product = this.adminProductService.getProductsId(this.activeRoute.snapshot.params.id);
        this.f.title.setValue(this.product.text.en.title);
        this.f.description.setValue(this.product.text.en.description);
        this.f.text.setValue(this.product.text.en.text);
        this.f.locale.setValue(this.product.text.en.locale);
        this.f.titleBg.setValue(this.product.text.bg.title);
        this.f.descriptionBg.setValue(this.product.text.bg.description);
        this.f.textBg.setValue(this.product.text.bg.text);
        this.f.localeBg.setValue(this.product.text.bg.locale);
        this.f.titleRu.setValue(this.product.text.ru.title);
        this.f.descriptionRu.setValue(this.product.text.ru.description);
        this.f.textRu.setValue(this.product.text.ru.text);
        this.f.localeRu.setValue(this.product.text.ru.locale);
        this.f.enabled.setValue(this.product.enabled);
        this.f.price.setValue(this.product.price);
        this.f.quantity.setValue(this.product.quantity);
        this.f.discount.setValue(this.product.discount);
        this.f.bestSaller.setValue(this.product.bestSaller);
        this.f.sale.setValue(this.product.sale);
        this.f.alt.setValue(this.product.alt);

        this.hrefParse = this.adminMainService.parseUrl();
        if(this.appMode === true){
            console.log(this.product);
            console.log(this.product.href);
            console.log(this.product.bestSaller);
            console.log(this.adminMainService.parseUrl());
        }

        this.parseImage(this.product.image);
        console.log(this.product);

        if(!AppConfig.settings.localhost){
            this.categoryName = this.hrefParse[4];
            if(this.activeRoute.snapshot.params.id)
                this.productName = this.adminMainService.linkToName(this.hrefParse[6]);
            else
                this.productName = this.f.title.value;
        }else{
            this.categoryName = this.hrefParse[3];
            if(this.activeRoute.snapshot.params.id)
                this.productName = this.adminMainService.linkToName(this.hrefParse[5]);
            else
                this.productName = this.f.title.value;
        }

        if(this.appMode === true){
            console.log(this.categoryName);
            console.log(this.productName);
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
        
        this.loading = true;
        let productJson;
        let href;
        let image;
        let imageOne;
        let imageTwo;
        let imageThree;

        console.log(this.imageOneExist);

        if (this.imageOneExist) {
            imageOne = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFileOne.name;
            this.adminProductService.editProductImage(this.selectedFileOne, this.categoryName, this.productName, this.imageOneForDelete);

            image = imageOne;
            console.log("imageOneExist");
            console.log(image);
        }

        if (this.imageTwoExist) {
            imageTwo = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFileTwo.name;
            this.adminProductService.editProductImage(this.selectedFileTwo, this.categoryName, this.productName, this.imageTwoForDelete);

            image = image + ',' + imageTwo;
            console.log("imageTwoExist");
            console.log(image);
        }

        if (this.imageThreeExist) {
            imageThree = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFileThree.name;
            this.adminProductService.editProductImage(this.selectedFileThree, this.categoryName, this.productName, this.imageThreeForDelete);

            image = image  + ',' + imageThree;
            console.log("imageThreeExist");
            console.log(image);
        }

        if (this.imageMainExist) {
            // this.onUpload();
            this.product.href = "assets/images/categories/" + this.categoryName  + "/" + this.productName + "/" + this.selectedFile.name;           
            this.adminProductService.editProductImage(this.selectedFile, this.categoryName, this.productName, this.imageMainForDelete);
        }

        if (!image) {
            image = this.product.image
            console.log("image == null");
            console.log(image);
            console.log("Fix Bug One");

        }


        //ima problem kogato se ima edna dobavena snimka i se dobavi oshe edna izchezvat starite. Trqbwa da se dobavqt i 3-te na vednyv
        // trqbva da se napravi da se dobavi novata snimka bez da izchezva starata
        if (this.product.image) {
            // code...
        }

        if (this.removeOne) {
            this.adminProductService.deleteProductSingleImage(this.categoryName, this.productName, this.removeOne.split("/").pop());
            image = image.replace(this.removeOne + ",", "");
            image = image.replace(this.removeOne, "");
            console.log("Fix Bug Two");
        }

        if (this.removeTwo) {
            this.adminProductService.deleteProductSingleImage(this.categoryName, this.productName, this.removeTwo.split("/").pop());
            image = image.replace(this.removeTwo + ",", "");
            image = image.replace(this.removeTwo, "");
            console.log("Fix Bug Three");
        }

        if (this.removeThree) {
            image = image.replace(this.removeThree, "");
            this.adminProductService.deleteProductSingleImage(this.categoryName, this.productName, this.removeThree.split("/").pop());
            console.log("Fix Bug Four");
            console.log(image);
        }

        console.log("Final Image String:" + image);

        let productID = null;
        productID = '"id"' + ":"  + '' + this.activeRoute.snapshot.params.id + '' +',';
        productJson  = '{' +
            productID + 
            '"quantity"' + ":"  + '' + this.f.quantity.value + '' +',' + 
            '"price"' + ":"  + '' + this.f.price.value + '' +',' + 
            '"href"' + ":"  + '"' + this.product.href + '"' +',' + 
            '"alt"' + ":"  + '"' + this.f.alt.value + '"' +',' + 
            '"enabled"' + ":"  + '' + this.f.enabled.value + '' +',' + 
            '"sale"' + ":"  + '' + this.f.sale.value + '' +',' + 
            '"bestSaller"' + ":"  + '' + this.f.bestSaller.value + '' +',' + 
            '"discount"' + ":"  + '' + this.f.discount.value + '' +',' + 
            '"image"' + ":"  + '"' + image + '"' +',' + 

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

        this.adminProductService.updateProduct(JSON.parse(productJson), this.categoryName);    

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

    parseImage(image:string){

        var imageForDeleteMain = image.split(","); 

        if (imageForDeleteMain[0]) {
            this.imageOneForDelete = imageForDeleteMain[0].split("/").pop();
            this.imageOneForDeleteFullPath = imageForDeleteMain[0];
        }
        if (imageForDeleteMain[1]) {
            this.imageTwoForDelete = imageForDeleteMain[1].split("/").pop();
            this.imageTwoForDeleteFullPath = imageForDeleteMain[1];
        }
        if (imageForDeleteMain[2]) {
            this.imageThreeForDelete = imageForDeleteMain[2].split("/").pop();
            this.imageThreeForDeleteFullPath = imageForDeleteMain[2];
        }
    }

    // deleteImageOnly(imageNumber: string){
    //     var imageName;
    //     if (imageNumber == "one")
    //         imageName = this.imageOneForDelete;
    //     if (imageNumber == "two")
    //         imageName = this.imageTwoForDelete;
    //     if (imageNumber == "three")
    //         imageName = this.imageThreeForDelete;

    //     if(this.appMode === true){
    //         console.log(imageName);
    //         console.log(this.categoryName);
    //         console.log(this.productName);
    //     }
    //     this.adminProductService.deleteProductSingleImage(this.categoryName, this.productName, imageName);
    //     /////////////////////////////////////////////////////////////////////
    //     // last step - generate and update new produc.image
    //     /////////////////////////////////////////////////////////////////////

    //     var newImage;

    //     let productID = null;
    //     let productJson;

    //     productID = '"id"' + ":"  + '' + this.activeRoute.snapshot.params.id + '' +',';
    //     productJson  = '{' +
    //         productID + 
    //         '"quantity"' + ":"  + '' + this.f.quantity.value + '' +',' + 
    //         '"price"' + ":"  + '' + this.f.price.value + '' +',' + 
    //         '"href"' + ":"  + '"' + this.product.href + '"' +',' + 
    //         '"enabled"' + ":"  + '' + this.f.enabled.value + '' +',' + 
    //         '"sale"' + ":"  + '' + this.f.sale.value + '' +',' + 
    //         '"bestSaller"' + ":"  + '' + this.f.bestSaller.value + '' +',' + 
    //         '"discount"' + ":"  + '' + this.f.discount.value + '' +',' + 
    //         '"image"' + ":"  + '"' + newImage + '"' +',' + 

    //         '"text"' + ":" + '{' +
    //             '"en"' + ":" + '{' +
    //                 '"locale"' + ":"  + '"' + "en" + '"' +',' + 
    //                 '"title"' + ":"  + '"' + this.f.title.value + '"' +',' + 
    //                 '"text"' + ":"  + '"' + this.f.text.value + '"' +',' + 
    //                 '"description"' + ":"  + '"' + this.f.description.value + '"' +
    //             '}'+',' + 
    //             '"bg"' + ":" + '{' +
    //                 '"locale"' + ":"  + '"' + "bg" + '"' +',' + 
    //                 '"title"' + ":"  + '"' + this.f.titleBg.value + '"' +',' + 
    //                 '"text"' + ":"  + '"' + this.f.textBg.value + '"' +',' + 
    //                 '"description"' + ":"  + '"' + this.f.descriptionBg.value + '"' +
    //             '}'+',' + 
    //             '"ru"' + ":" + '{' +
    //                 '"locale"' + ":"  + '"' + "ru" + '"' +',' + 
    //                 '"title"' + ":"  + '"' + this.f.titleRu.value + '"' +',' + 
    //                 '"text"' + ":"  + '"' + this.f.textRu.value + '"' +',' + 
    //                 '"description"' + ":"  + '"' + this.f.descriptionRu.value + '"' +
    //             '}'+ 
    //         '}'+
    //     '}';
       

    //     // this.adminProductService.updateProduct(JSON.parse(productJson), this.categoryName);
    // }

    removeImageOne(val){
        console.log(val);
        this.removeOne = val;
    }

    removeImageTwo(val){
        console.log(val);
        this.removeTwo = val;
    }

    removeImageThree(val){
        console.log(val);
        this.removeThree = val;
    }
}