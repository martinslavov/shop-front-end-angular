import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { QueryEntity } from '@datorama/akita';

import { AppConfig } from '../../_configs/config';
import { CartStore, State } from './cart.store';
import { CartItem } from './cart.model';
import { ProductQuery } from '../../product/state';

@Injectable({
    providedIn: 'root'
})
export class CartQuery extends QueryEntity<State, CartItem> {

    appMode: boolean = AppConfig.settings.debug;

    constructor(protected store: CartStore, private productsQuery: ProductQuery) {
        super(store);
    }

    //select all from product query
    selectItems$ = combineLatest(this.selectAll(), this.productsQuery.selectAll({ asObject: true })).pipe(
        map(joinItems),
        publishReplay(),
        refCount()
    );

    selectTotal$ = this.selectItems$.pipe(map(items => items.reduce((acc, item) => acc + item.total, 0).toFixed(2)));
}

    /**
    *
    * @param {any} cartItems
    * @param {any} products
    * @returns {any}
    */
    function joinItems([cartItems, products]) {
        return cartItems.map(cartItem => {
            const product = products[cartItem.productId];
            if(this.appMode === true)
                console.log(cartItem.quantity);
            return {
                ...cartItem,
                ...product,
                selectedQuantity: cartItem.quantity,
                total: Number((cartItem.quantity * product.price).toFixed(2))
        };
    });
}
