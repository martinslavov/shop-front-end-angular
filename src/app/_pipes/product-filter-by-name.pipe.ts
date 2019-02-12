import { Pipe, PipeTransform } from '@angular/core';

import { AppConfig } from '../_configs/config';
import { Product } from '../_models';

@Pipe({
	name: 'productFilterByName'
})
export class ProductFilterByNamePipe implements PipeTransform {

	appMode: boolean = AppConfig.settings.debug;

 	 transform(product: Product[], searchTerm: string): any {
		if(!product || !searchTerm){
			if(this.appMode === true)
				console.log("Missing product or searchTerm!");
			return product;
		}
	   
		return product.filter((product) => 
				product.text.en.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
			);
	}
}