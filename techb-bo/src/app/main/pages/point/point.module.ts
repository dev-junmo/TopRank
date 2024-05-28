import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';


//point 
import { PointComponent } from './point.component';
import { PointRoutingModule } from './point.routing';

//Point
import { PointQueryForm } from './point/point-query-form/point-query-form';
import { PointListPage } from './point/point-list.page'


//point charge
import { PointChargeListPage } from './point-charge/point-charge-list.page';
import { PointChargeQueryForm } from './point-charge/point-charge-query-form/point-charge-query-form';

// reward point
import { RewardPointQueryForm } from './reward-point/reward-point-query-form/reward-point-query-form';
import { RewardPointListPage } from './reward-point/reward-point-list.page';
import { RewardPointWithdrawQueryForm } from './reward-point-withdraw/reward-point-withdraw-query-form/reward-point-withdraw-query-form';
import { RewardPointWithdrawListPage } from './reward-point-withdraw/reward-point-withdraw-list.page';

// store
import { PointStore } from '@app/common/store/point.store';
import { PointChargeStore } from '@app/common/store/point-charge.store';
import { RewardPointStore } from '@app/common/store/reward-point.store';
import { RewardPointWithdrawStore } from '@app/common/store/reward-point-withdraw.store';

@NgModule({
  imports: [
    PointRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTableModule,
    BOCommonModule,
  ],
  declarations: [
    //point
    PointComponent,
    PointQueryForm,
    PointChargeQueryForm,
    RewardPointQueryForm, 
    RewardPointWithdrawQueryForm,
    PointListPage,
    PointChargeListPage,        
    RewardPointListPage,
    RewardPointWithdrawListPage,
 
  ],
  providers: [
    PointStore, 
    PointChargeStore,
    RewardPointStore,
    RewardPointWithdrawStore
  ]
})

export class PointModule { }
