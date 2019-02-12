import { NgModule } from '@angular/core';

// Product Filter
import { ProductFilterPipe, ProductFilterByNamePipe, ProductFilterByPricePipe, ProductFilterAllPipe, ProductSliderOnSalePipe, ProductSliderBestSallerPipe } from '../_pipes';
// Translate
import { TranslatePipe } from '../_utils/translate/translate.pipe';
import { ProductSortPipe } from './product-sort.pipe';

@NgModule({
	imports: [
	// dep modules
	],
	declarations: [ 
		ProductFilterByPricePipe,
		ProductFilterPipe,
		ProductFilterByNamePipe,
		ProductFilterAllPipe,
		ProductSliderOnSalePipe,
		ProductSliderBestSallerPipe,
		// Translate
		TranslatePipe,
		ProductSortPipe  
	],
	exports: [
		ProductFilterByPricePipe,
		ProductFilterPipe,
		ProductFilterByNamePipe,
		ProductFilterAllPipe,
		ProductSliderOnSalePipe,
		ProductSliderBestSallerPipe,
		// Translate
		TranslatePipe  
	]	
})
export class PipesModule {}