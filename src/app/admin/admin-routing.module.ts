import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthAdminGuard } from '../_guards';
import { AdminComponent } from '../admin';
import { AdminLoginComponent } from '../admin/login';
import { AdminProductComponent } from '../admin/product';
import { AdminCategoryComponent } from '../admin/category';
import { AddComponent } from '../admin/product/add';
import { EditComponent } from '../admin/product/edit';

import { ProductService,  CategoryService } from '../_services';
import { AdminCategoryService, AdminProductService } from '../admin/_services';

const adminRoutes: Routes = [

	{ path: '', component: AdminComponent, canActivate: [AuthAdminGuard] },
	{ path: 'login', component: AdminLoginComponent },
	{ path: 'category', component: AdminCategoryComponent ,
										canActivate: [AuthAdminGuard],
										resolve: {
									    	category: AdminCategoryService
									    },	
	},
	{ path: 'category/:categoryName',	component: AdminProductComponent, canActivate: [AuthAdminGuard],
		    								resolve: { product: AdminProductService },
									 	    data: { path: 'admin/category/:categoryName' },				
			children: [
				{ path: 'product/:productName/edit/:id', component: EditComponent },
				{ path: 'product/add',	component: AddComponent }
			]
	},	
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
              ],
    exports: [RouterModule]
})
export class AdminRoutingModule {}