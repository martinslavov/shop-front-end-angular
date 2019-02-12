import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './login/login.component';
import { AdminProductComponent } from './product/product.component';
import { AdminCategoryComponent } from './category/category.component';
import { AddComponent } from '../admin/product/add';
import { EditComponent } from '../admin/product/edit';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    imports: [
    	CommonModule,
        AdminRoutingModule,	
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ],
    declarations: [
        AdminComponent,
        AdminLoginComponent,
        AdminProductComponent,
        AdminCategoryComponent,
        AddComponent,
        EditComponent
        ]
})
export class AdminModule { }