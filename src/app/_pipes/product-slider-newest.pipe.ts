import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../_models';

@Pipe({
 	name: 'productSliderNewest'
})
export class ProductSliderNewestPipe implements PipeTransform {

	transform(products: Product[], searchProduct: string) {
		return products.filter((product) => 
				product.sale == true
			);
	}
}