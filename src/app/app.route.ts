import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsDetailComponent } from './restaurants-detail/restaurants-detail.component';
import { MenuComponent } from './restaurants-detail/menu/menu.component';
import { ReviewsComponent } from './restaurants-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './security/login/login.component';
import { LoggedIdGuard } from './security/loggedin.guard'

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login/:to', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'restaurants/:id', component: RestaurantsDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]
    },
    {path: 'restaurants', component: RestaurantsComponent},
    {
        path: 'order', loadChildren: './order/order.module#OrderModule',
        canLoad:[LoggedIdGuard], canActivate: [LoggedIdGuard]
    },
    {path: 'order-summary', component: OrderSummaryComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    
    {path: '**', component: NotFoundComponent}
];