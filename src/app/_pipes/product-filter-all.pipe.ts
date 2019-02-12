import { Pipe, PipeTransform } from '@angular/core';

import { AppConfig } from '../_configs/config';
import { Product } from '../_models';

@Pipe({
  name: 'productFilterAll'
})
export class ProductFilterAllPipe implements PipeTransform {

	appMode: boolean = AppConfig.settings.debug;

	transform(product: Product[], path: string[], order: number): Product[] {

		if(this.appMode === true){
			console.log("path: " + path);
			console.log("order: " + order);
		}
		// Check if is not null
		if (!product || !path || !order) return product;

		return product.sort((a: Product, b: Product) => {
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