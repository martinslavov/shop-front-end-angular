import { Injectable } from '@angular/core';
import { QueryConfig, QueryEntity } from '@datorama/akita';

import { ProductStore, State } from './product.store';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
@QueryConfig({
    sortBy: 'price'
})
export class ProductQuery extends QueryEntity<State, Product> {
    constructor(protected store: ProductStore) {
        super(store);
    }

    /**
    *
    * @param {string} value
    * @returns {Observable<Observable<Product[]>}
    */
    getProducts(term: string, sortBy: keyof Product) {
        return this.selectAll({
            sortBy,
            filterBy: entity => entity.text.en.title.toLowerCase().includes(term)
        });
    }
}