import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';
import { BSCommonModule } from '@bricks/common/bs-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';

///////////////////////////////////////////////////////////////////

import { SetupSideModule } from './_layouts/side-menu/setup-side.module';
import { SetupComponent } from './setup.component';
import { SetupRoutingModule } from './setup.routing';

import { BasicComponent } from './basic/basic.component';
import { BasicComponent2 } from './basic2/basic.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CsComponent } from './cs/cs.component';
import { TermsComponent } from './terms/terms.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './payment/payment.component';
import { InspectComponent } from './inspect/inspect.component';


// import { BoardStore } from './../../../common/store/board.store';
import { PopularComponent } from './search/popular/popular.component';
import { RecommendComponent } from './search/recommend/recommend.component';
import { AutoSearchComponent } from './search/auto-search/auto-search.component';
import { BasicSearchComponent } from './search/basic-search/basic-search.component'

import { UiSwitchModule } from 'ngx-toggle-switch';
//import { NgDaumAddressModule } from 'ng2-daum-address';

//provider
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
//import { ProviderDetailComponent } from './provider/provider-detail/provider-detail.component';
import { ProviderCreateComponent } from './provider/provider-create/provider-create.component';
import { ProviderMemberCreateComponent } from './provider/provider-create/provider-member-create/provider-member-create.component';

import { ProviderListQueryFormComponent } from '../setup/provider/provider-list/provider-list-query-form/provider-list-query-form.component';
import { ProviderDeliveryCreateComponent } from './provider/provider-create/provider-delivery-create/provider-delivery-create.component';

@NgModule({
  imports: [
    CommonModule,
    SetupRoutingModule,
    BOCommonModule,
    BSCommonModule,
    SetupSideModule,
    DataTableModule,
    UiSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    //NgDaumAddressModule
  ],
  declarations: [
    PopularComponent,
    SetupComponent,
    AutoSearchComponent,
    BasicSearchComponent,
    BasicComponent,
    BasicComponent2,
    DashboardComponent,
    CsComponent,
    AdminComponent,
    SearchComponent,
    PaymentComponent,
    AdminUpdateComponent,
    RecommendComponent,
    TermsComponent,
    InspectComponent,

    // providers
    ProviderListComponent,
    //ProviderDetailComponent,
    ProviderCreateComponent,
    ProviderMemberCreateComponent,
    ProviderListQueryFormComponent,
    ProviderDeliveryCreateComponent,

  ],
  providers: [

  ],
  entryComponents: [
  ]
})
export class SetupModule { }
