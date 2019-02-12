import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../_models';

@Pipe({
	name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

	transform(products: Product[], searchProductName: string) {
		return products.filter((product) => 
				product.text.en.title.toLowerCase() == searchProductName
			);
	}
}