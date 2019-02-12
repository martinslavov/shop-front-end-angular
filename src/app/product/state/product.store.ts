import { Injectable } from '@angular/core';
import { StoreConfig } from '@datorama/akita';
import { EntityState, EntityStore } from '@datorama/akita';

import { Product } from './product.model';

export interface State extends EntityState<Product> {}

@Injectable({
	providedIn: 'root'
})
@StoreConfig({
	name: 'products'
})
export class ProductStore extends EntityStore<State, Product> {
	constructor() {
		super();
	}
}