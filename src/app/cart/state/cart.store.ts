import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { CartItem } from './cart.model';
import { Product } from '../../product/state';

export interface State extends EntityState<CartItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
    name: 'cart',
    idKey: 'productId'
})
export class CartStore extends EntityStore<State, CartItem> {
    constructor() {
        super();
    }

    /**
    *
    * @param {Product["id"]} productId
    * @param {number} operand
    */
    updateQuantity(productId: Product['id'], operand = 1) {
        this.update(productId, entity => {
            const newQuantity = entity.quantity + operand;
            return {
                ...entity,
                quantity: newQuantity
            };
        });
    }
}