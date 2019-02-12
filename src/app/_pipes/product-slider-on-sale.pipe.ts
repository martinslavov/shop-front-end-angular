import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../_models';

@Pipe({
 	name: 'productSliderOnSale'
})
export class ProductSliderOnSalePipe implements PipeTransform {

	transform(products: Product[], searchProduct: string) {
		return products.filter((product) => 
				product.sale == true
			);
	}
}