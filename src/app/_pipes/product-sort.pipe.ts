import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../_models';

@Pipe({
  name: 'productSort'
})
export class ProductSortPipe implements PipeTransform {

 	transform(companies: Product[], path: string[], order: number = 1): Product[] {

  		// Check if is not null
	    if (!companies || !path || !order) return companies;

		    return companies.sort((a: Product, b: Product) => {
		      // We go for each property followed by path
				path.forEach(property => {
					a = a[property];
					b = b[property];
				})

				// Order * (-1): We change our order
				return a > b ? order : order * (- 1);
	    })
 	}

}
