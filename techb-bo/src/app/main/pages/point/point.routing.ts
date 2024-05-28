import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//point 
import { PointComponent } from './point.component';
import { PointChargeListPage } from './point-charge/point-charge-list.page';
import { PointListPage } from './point/point-list.page';
import { RewardPointListPage } from './reward-point/reward-point-list.page';
import { RewardPointWithdrawListPage } from './reward-point-withdraw/reward-point-withdraw-list.page';

const routes: Routes = [
  {
    path: '',
    component: PointComponent,  
    children: [

      { path: '', redirectTo: 'list'},
      { path: 'list', component: PointListPage },      
      
      { path: 'point-charge', redirectTo: 'point-charge/list',  pathMatch: 'full' },
      { path: 'point-charge/list', component: PointChargeListPage },

      { path: 'point', redirectTo: 'point/list',  pathMatch: 'full' },
      { path: 'point/list', component: PointListPage },

      { path: 'reward-point', redirectTo: 'reward-point/list',  pathMatch: 'full' },
      { path: 'reward-point/list', component: RewardPointListPage },

      { path: 'reward-point-withdraw', redirectTo: 'reward-point-withdraw/list',  pathMatch: 'full' },
      { path: 'reward-point-withdraw/list', component: RewardPointWithdrawListPage },

      // { path: 'point-charge/update/:id', component: PointChargeCreateComponent },
      // { path: 'point-charge/create', component: PointChargeCreateComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointRoutingModule { }


