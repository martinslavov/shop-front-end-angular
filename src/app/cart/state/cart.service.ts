import { Injectable } from '@angular/core';
import { ID, toBoolean } from '@datorama/akita';

import { AppConfig } from '../../_configs/config';
import { CartStore } from './cart.store';
import { CartQuery } from './cart.query';
import { createCartItem } from './cart.model';
import { Product } from '../../product/state';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    appMode: boolean = AppConfig.settings.debug;

    constructor(private cartStore: CartStore, private cartQuery: CartQuery) {}

    /**
    *
    * @param {Product["id"]} productId
    */
    addProductToCart(productId: Product['id']) {
        const findItem = this.cartQuery.getEntity(productId);
        if (toBoolean(findItem)) {
            return this.cartStore.updateQuantity(productId);
        }

        const item = createCartItem({
            productId
        });
        if(this.appMode === true)
            console.log(item);

        return this.cartStore.add(item);
    }

    /**
    *
    * @param {Product["id"]} productId
    */
    subtract(productId: Product['id']) {
        const findItem = this.cartQuery.getEntity(productId);
        if (toBoolean(findItem)) {
            if (findItem.quantity === 1) {
                return this.cartStore.remove(productId);
            }

          return this.cartStore.updateQuantity(findItem.productId, -1);
        }
    }

    /**
    *
    * @param {ID} productId
    */
    remove(productId: ID) {
        this.cartStore.remove(productId);
    }
}