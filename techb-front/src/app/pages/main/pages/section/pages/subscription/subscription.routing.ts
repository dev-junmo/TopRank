import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailPageComponent } from './pages/product-detail/product-detail.page';
import { ProductsPageComponent } from './pages/products/products.page';

import { SubscriptionComponent } from './subscription.component';
import { AuthGuard, AuthProductViewGuard } from '../../../../../../service/auth.guard';

const routes: Routes = [
    { 
        path: '',
        component: SubscriptionComponent,
        canActivate: [ AuthGuard ],
        children:[
            // { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '', component: ProductsPageComponent },
            { path: 'products', component: ProductsPageComponent },
            { path: 'products/product-detail/:product_seq', component: ProductDetailPageComponent, /*canActivate: [AuthProductViewGuard]*/},
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubscriptionRoutingModule { }
