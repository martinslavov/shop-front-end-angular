import { NgModule, APP_INITIALIZER }      from '@angular/core';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUploaderModule } from 'ngx-uploader';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxGalleryModule } from 'ngx-gallery';
import { NguCarouselModule } from '@ngu/carousel';

// Import Application Config 
import { AppConfig } from './_configs/config';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// Used to create fake backend
import { fakeBackendProvider } from './_helpers';
// Import Components
import { AppComponent }  from './app.component';
import { HeaderComponent, FooterComponent } from './_layouts';
import { HomeComponent } from './home';
import { CategoryComponent } from './category/category.component';
import { ProductComponent, ProductDetailComponent } from './product';
// Import Utils
import { PaginationComponent, PdfGeneratorComponent, BreadcrumbComponent, GalleryComponent, FilterSliderComponent, ProductSliderComponent,ImageSliderComponent } from './_utils';
// Import Module
import { CartModule } from './cart/cart.module';
import { PipesModule } from './_pipes/pipes.module'
// Import Translate
import { TranslateService } from './_utils/translate/translate.service';

export function initializeApp(appConfig: AppConfig) {
    //appConfig = class, load = function from class
    return () => appConfig.load();
}

export function setupTranslateFactory(
    service: TranslateService): Function {
    return () => service.use('en');
}

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        routing,
        SlimLoadingBarModule.forRoot(),
        NgxUploaderModule,
        NgxPaginationModule,
        McBreadcrumbsModule.forRoot(),
        Ng5SliderModule,
        NgxGalleryModule,
        NguCarouselModule,
        
        CartModule,
        PipesModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,       
        HeaderComponent,        
        CategoryComponent,
        ProductComponent,
        ProductDetailComponent,
        FilterSliderComponent,
        PaginationComponent,
        PdfGeneratorComponent,
        BreadcrumbComponent,
        GalleryComponent,
        ImageSliderComponent,
        ProductSliderComponent,    
    ],       
    providers: [
        // Translate
        TranslateService,
        {
            provide: APP_INITIALIZER,
            useFactory: setupTranslateFactory,
            deps: [
                TranslateService
              ],
            multi: true
        },
        // Must load first, on initializeApp
        AppConfig,
        { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfig], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


    ],
    bootstrap: [AppComponent]
})

export class AppModule { }