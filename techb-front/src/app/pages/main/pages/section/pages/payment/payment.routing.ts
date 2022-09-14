import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointChargeCompletedPageComponent } from './pages/point-charge-completed/point-charge-completed.page';
import { PointChargePageComponent } from './pages/point-charge/point-charge.page';
import { PurchaseKeywordCompletedPageComponent } from './pages/purchase-keyword-completed/purchase-keyword-completed.page';
import { PurchaseKeywordPageComponent } from './pages/purchase-keyword/purchase-keyword.page';

import { PaymentComponent } from './payment.component';
import { AuthGuard, AuthPurchaseGuard} from '../../../../../../service/auth.guard';

const routes: Routes = [
    {  
        path: '',
        component: PaymentComponent,
        canActivate: [AuthGuard],
        children:[
            // { path: '', redirectTo: '', pathMatch: 'full' },
            { path: 'point-charge', component: PointChargePageComponent },
            { path: 'point-charge/point-charge-completed', component: PointChargeCompletedPageComponent },
            { 
                path: 'purchase-keyword/:goods_seq', 
                component: PurchaseKeywordPageComponent, 
                canActivate: [ AuthPurchaseGuard ]
            },
            { path: 'purchase-keyword-completed', component: PurchaseKeywordCompletedPageComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PaymentRoutingModule { }
