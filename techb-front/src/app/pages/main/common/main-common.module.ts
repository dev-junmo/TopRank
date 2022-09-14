
// todo : 앞으로 이 모듈을 사용을 안하던지 @bricks로 편입한다.

import { BSCommonModule } from '../../../../common/bs-common.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

// import { BOPageHeaderComponent } from './bo-page-header/bo-page-header.component';
// import { BOPageButtonConfig } from './bo-page-header/bo-page-button-config';
// import { BOPagePaddingComponent } from './bo-page-padding/bo-page-padding.component';
// import { BOPageButtonComponent } from './bo-page-button/bo-page-button.component';

//import { BOSideMenuComponent } from './bo-side-menu/bo-side-menu.component';


//store
// import { BSApi } from '../../../common/core/bs-api';
// import { BSDatatableStore } from './store/bs-datatable.store';
// import { BSBaseStore } from './store/bs-base.store';
// import { ProviderStore } from './store/provider.store';
// import { ConfigStore } from './store/config.store';
// import { AdminStore } from './store/admin.store';
// import { OrderListStore } from './store/order-list.store';
// import { OrderStore } from './store/order.store';

// form
//import { BOBaseForm } from './form/bo-base-form/bo-base-form';

// import { BOShowHideForm } from './query-form-ctrls/bo-showhide-form/bo-showhide-form';
// import { BOSearchKeywordForm } from './query-form-ctrls/bo-searchkeyword-form/bo-searchkeyword-form';
// import { BOSubmitButtonForm } from './query-form-ctrls/bo-submit-button-form/bo-submit-button-form';
// import { BOSearchButtonForm } from './query-form-ctrls/bo-search-button-form/bo-search-button-form';
// import { BOPeriodForm } from './query-form-ctrls/bo-period-form/bo-period-form';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface, SwiperModule} from 'ngx-swiper-wrapper';

// import { BSPeriodQueryCtrl } from '../../../common/bs-period-query-ctrl/bs-period-query-ctrl';
import { ResponsiveModule } from 'ng2-responsive';

//date
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale, koLocale } from 'ngx-bootstrap/locale';
import { TBGoodsInfoboxView } from './views/tb-goods-infobox/tb-goods-infobox.view';
/////////////////
//view
// import { ThatItemView } from '../../../common/views/that-item-view/that-item.view';
// import { ThatSceneView } from '../../../common/views/that-scene-view/that-scene.view';
// import { GoodsListItemView } from '../../../common/views/goods-list-item-view/goods-list-item.view';
// import { GoodsPriceView } from '../../../common/views/goods-price-view/goods-price.view';
// import { GoodsPriceSView } from './views/goods-price-s-view/goods-price-s.view';

///////////////////
// service

// popup

// import { ReviewViewPopupModule } from './popups/review-view.popup/review-view.popup.module';

// import { ReviewPhotoPopup, ReviewPhotoPopupService} from './popups/review-photo.popup/index';
// import { CJPointPopup, CJPointPopupService} from './popups/cj-point.popup/index';

// import { OnlyNumber } from '../../common/core/only-number.directive';

// import { AppEnvService } from '../common/service/app-env.service';
// import { BSVideoPlayerService } from '../common/service/bs-videoplayer.service';

//import { TVMDaumAddressBtn } from './ui/tvm-daum-address-btn/tvm-daum-address-btn';


defineLocale('ko', koLocale);

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // ReviewViewPopupModule,
    //UiSwitchModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule,
    SwiperModule,
    BSCommonModule,
    ResponsiveModule,


  ],
  declarations: [
    TBGoodsInfoboxView,
  ],
  exports:[
    TBGoodsInfoboxView,
  ],

    providers: [
        
    ],

    // #todo 리소스 낭비 / 나중에 필요한 곳에만 사용하게 변경 필요
    entryComponents: [

    ],
})
export class MainCommonModule { }

