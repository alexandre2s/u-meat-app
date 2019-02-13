import {NgModule} from '@angular/core'

import { RestaurantsService } from '../restaurants/restaurants.service';
import { ShoppingCartService } from '../restaurants-detail/shopping-cart/shopping-cart.service';
import { OrderService } from '../order/order.service';

@NgModule({
    providers: [
        RestaurantsService,
        {provide: OrderService, useClass: OrderService},
        {provide: ShoppingCartService, useClass: ShoppingCartService}
    ]
})

export class CoreModule{}