import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../_models';

@Pipe({
	name: 'productSliderBestSaller'
})
export class ProductSliderBestSallerPipe implements PipeTransform {

	transform(products: Product[], searchProduct: string) {
		return products.filter((product) => 
				product.bestSaller == true
			);
	}
}