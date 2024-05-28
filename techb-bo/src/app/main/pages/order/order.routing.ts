import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order.component';
import { OrderListPage } from './order/order-list.page';


const routes: Routes = [
    {
        path: '',
        component: OrderComponent,
        children: [
            
            { path: '', redirectTo: 'list'},
            { path: 'list', component: OrderListPage },      
            
            // 주문리스트
            { path: 'order', redirectTo: 'order/list',  pathMatch: 'full' },
            { path: 'order/list', component: OrderListPage },     
            
       

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule { }
