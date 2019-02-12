import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';
import { HomeComponent } from './home';
import { CategoryComponent } from './category';
import { ProductComponent, ProductDetailComponent } from './product';
import { ProductService,  CategoryService } from './_services';
import { CartComponent } from './cart/cart.component';
import { ImageSliderComponent } from './_utils';

const appRoutes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoryComponent ,
    									resolve: {
									    	category: CategoryService
									    }
	},
    { path: 'categories/:categoryName',	component: ProductComponent,
		    							resolve: {
									    	product: ProductService
									    },
									    data: { path: 'categories/:categoryName' }
	},
    { path: 'categories/:categoryName/products/:productName', 
    									component: ProductDetailComponent,
									    data: { path: 'categories/:categoryName/products/:productName' }
	
	},
	{ path: 'cart',	component: CartComponent },
	{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },

    { path: '**', redirectTo: '/categories' }
];

export const routing = RouterModule.forRoot(appRoutes);