import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { ShoppingCartService } from "../restaurants-detail/shopping-cart/shopping-cart.service"
import { CartItem } from "../restaurants-detail/shopping-cart/cart-item.model";
import { Order, OrdemItem } from "./order.model";
import { MEAT_API } from '../app.api'

@Injectable()
export class OrderService{

    constructor(
        private shoppingCartService: ShoppingCartService,
        private http: HttpClient
    ){}

    itemsValue(){
        return this.shoppingCartService.total();
    }

    cartItems(): CartItem[]{
        return this.shoppingCartService.items
    }

    increaseQty(item: CartItem){
        this.shoppingCartService.increaseQty(item);
    }

    decreaseQty(item: CartItem){
        this.shoppingCartService.decreaseQty(item);
    }

    remove(item: CartItem){
        this.shoppingCartService.removeItem(item);
    }

    checkOrder(order: Order): Observable<string>{

        console.log('order-----')
        console.log(order)

        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            .pipe(map(order => order.id))
        ;
    }

    clear(){
        this.shoppingCartService.clear()
    }


}