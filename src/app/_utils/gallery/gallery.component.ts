import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

	constructor() { }

	ngOnInit() {
	// 	this.galleryOptions = [
 //            {
 //                width: '540px',
 //                height: '500px',
 //                thumbnailsColumns: 4,
 //                imageAnimation: NgxGalleryAnimation.Slide,

 //                preview: false,
 //                imageArrows: false,
 //                thumbnailsArrows: false
 //            },
 //            // max-width 800
 //            {
 //                breakpoint: 800,
 //                width: '540px',
 //                height: '500px',
 //                imagePercent: 80,
 //                thumbnailsPercent: 20,
 //                thumbnailsMargin: 20,
 //                thumbnailMargin: 20,

 //                preview: false,
 //                imageArrows: false,
 //                thumbnailsArrows: false
 //            },
 //            // max-width 400
 //            {
 //                breakpoint: 400,
 //                preview: false,
 //                imageArrows: false,
 //                thumbnailsArrows: false
 //            }
 //        ];
 
 //        this.galleryImages = [
 //            {
 //                small: 'assets/images/gallery/1-big.jpg',
 //                medium: 'assets/images/gallery/1-big.jpg',
 //                big: 'assets/images/gallery/1-big.jpg'
 //            },
 //            {
 //                small: 'assets/images/gallery/2-big.jpg',
 //                medium: 'assets/images/gallery/2-big.jpg',
 //                big: 'assets/images/gallery/2-big.jpg'
 //            },
 //            {
 //                small: 'assets/images/gallery/3-big.jpg',
 //                medium: 'assets/images/gallery/3-big.jpg',
 //                big: 'assets/images/gallery/3-big.jpg'
 //            }
 //        ];
	}

}
