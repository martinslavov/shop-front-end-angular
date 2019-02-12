import { Pipe, PipeTransform } from '@angular/core';

import { AppConfig } from '../_configs/config';
import { Product } from '../_models';

@Pipe({
	name: 'productFilterByPrice'
})
export class ProductFilterByPricePipe implements PipeTransform {
 	appMode: boolean = AppConfig.settings.debug;

	transform(products: Product[], searchProductPriceMin: number, searchProductPriceMax: number) {
		if(this.appMode === true){
			console.log("searchProductPriceMin: " + searchProductPriceMin);
			console.log("searchProductPriceMax: " + searchProductPriceMax);
		}
		
		if (searchProductPriceMin == null)
			searchProductPriceMin == 0;

		if (searchProductPriceMax == null)
			searchProductPriceMax == 1000000;


		return products.filter((product) => 
			product.price >= searchProductPriceMin && product.price <= searchProductPriceMax
		);
	}
}
