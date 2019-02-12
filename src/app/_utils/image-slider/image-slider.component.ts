import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

    imgags = [
        {   
            id: 1,
            href: 'assets/images/sliders/kisspng-gilets-life-sl.png',
            url: 'cloth-and-linen-products/products/life-jacket', 
            text: 'Stay safe on the water – wear a floatation device whenever sailing, fishing or paddling your canoe. Our personal floatation devices come in various shapes and sizes to fit a variety of wearers',
            category: 'Cloth and linen', 
            alt: 'Life Jacket',
            title: 'Life Jacket'
        }
        ,
        {   
            id: 2,
            href: 'assets/images/sliders/uflex.jpg',
            url:  'cloth-and-linen-products/products/uflex-electric-trim-tab-kit', 
            text: 'Stay safe on the water – wear a floatation device whenever sailing, fishing or paddling your canoe. Our personal floatation devices come in various shapes and sizes to fit a variety of wearers',
            category: 'Cloth and linen',
            alt: 'Uflex Electric Trim Tab Kit',
            title: 'Life Jacket'  
        },
        {   
            id: 3,
            href: 'assets/images/sliders/COURSE.jpg', 
            url:  'cloth-and-linen-products/products/course-keeper-dual-rudder', 
            text: 'Stay safe on the water – wear a floatation device whenever sailing, fishing or paddling your canoe. Our personal floatation devices come in various shapes and sizes to fit a variety of wearers',
            category: 'Cloth and linen',
            alt: 'Course Keeper Dual Rudder',
            title: 'Course Keeper Dual Rudder'  
        }
    ];
    public carouselConfig: NguCarouselConfig = {
        grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
        slide: 1,
        speed: 250,
        point: {
            visible: true
        },
        load: 2,
        velocity: 0,
        touch: true,
        loop: true,
        easing: 'cubic-bezier(0, 0, 0.2, 1)',
        interval: { timing: 5500 },
        animation: 'lazy'
    };    

    constructor() {}
    ngOnInit() {
    }
}