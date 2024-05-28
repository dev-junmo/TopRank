import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndModule } from './ng2-dnd-master/dnd.module';

import { BSCommonModule } from '@bricks/common/bs-common.module';
import { BSButtonModule } from './bs-button/bs-button.module';

import { UiSwitchModule } from 'ngx-toggle-switch';
import { BOButtonCollection } from './bo-button-collection/bo-button-collection';

import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { BOPageHeaderComponent } from './bo-page-header/bo-page-header.component';
import { BOPageButtonConfig } from './bo-page-header/bo-page-button-config';
import { BOPagePaddingComponent } from './bo-page-padding/bo-page-padding.component';
import { BOPageButtonComponent } from './bo-page-button/bo-page-button.component';

import { BOSideMenuComponent } from './bo-side-menu/bo-side-menu.component';

import { BSUnderconstructorPageComponent } from './page/bs-underconstructor-page/bs-underconstructor-page.component';
import { BS404ErrorPageComponent } from './page/bs-404-error-page/bs-404-error-page.component';
// import { BsUnderconstructorPageComponent } from './page/bs-underconstructor-page/bs-underconstructor-page.component';
// import { Bs404ErrorPageComponent } from './page/bs-404-error-page/bs-404-error-page.component';
// store
//import { Api } from './store/api';

// store
import { BSDatatableStore } from './store/bs-datatable.store';
import { BSBaseStore } from './store/bs-base.store';
import { ProviderStore } from './store/provider.store';
import { ConfigStore } from './store/config.store';
import { AdminStore } from './store/admin.store';

// store > order
import { OrderStore } from './store/order.store';
import { OrderListStore } from './store/order-list.store'; //todo : 제거 / 다른데 합쳐야 함
import { OrderRefundStore } from './store/order-refund.store';
import { OrderReturnStore } from './store/order-return.store';
import { OrderShipmentStore } from './store/order-shipment.store';


import { PopularStore } from './store/search-word.store';
import { RecommendStore } from './store/search-word.store';
import { AutoSearchStore } from './store/search-word.store';
import { BasicSearchStore } from './store/search-word.store';
import { CouponStore } from './store/coupon.store';
import { TreeStore } from './store/tree.store';
import { GoodsIconStore } from './store/goods-icon.store';
import { GoodsStore } from './store/goods.store';
import { DisplayMainStore }from './store/display-main.store';
import { ProgramStore } from './store/program.store';
import { BrandStore } from './store/brand.store';
import { ProgramBannerStore } from './store/program-banner.store'
import { MainEventBannerStore } from './store/main-event-banner.store';
import { MainBrandBannerStore } from './store/main-brand-banner.store';
import { MainStarAuctionStore } from './store/main-star-auction.store';
import { MainClipStore } from './store/main-clip.store';
import { MainBannerStore } from './store/main-banner.store';

import { MainNewStore } from './store/main-new.store';
import { MainBrandStore } from './store/main-brand.store';
import { MainBrandTitleStore } from './store/main-brand-title.store';

import { MainReviewStore } from './store/main-review.store';
import { DisplayReviewBestStore } from './store/display-review-best.store';
import { BrandBannerStore } from './store/brand-banner.store';
import { MainStarGoodsStore } from './store/main-stargoods.store';
import { MainSceneGoodsStore} from './store/main-scene-goods.store';
import { MyctMainBannerStore } from './store/myct-mainbanner.store';
import { MyctBannerStore } from './store/myct-banner.store';
import { MyctClipStore } from './store/myct-clip.store';
import { MyctBestGoodsStore } from './store/myct-bestgoods.store';
import { EventStore } from './store/event.store';
//import { GoodsQNAStore } from './store/goods-qna-list.store';
import { GoodsReviewStore } from './store/goods-review-list.store';
import { EmailStore } from './store/email.store';
import { SMSStore } from './store/sms.store';
import { GoodsBestReviewStore } from './store/goods-best-review.store';
import { GoodsInfoStore } from './store/goods-info.store';
import { GoodsSubInfoStore } from './store/goods-subinfo.store';
import { MyctProgramGoodsStore } from './store/myct-program.store';
import { CategoryStore } from './store/category.store';
import { AuctionStore } from './store/auction.store';
import { KakaoStore } from './store/kakao.store';
import { PrivatePaymentStore } from './store/private-payment.store'
import { SaleStore } from './store/sale.store';
import { StatisticsStore } from './store/statistics.store'
import { StockStore } from './store/stock.store';
import { MemberListStore } from './store/member-list.store';

// form
import { BOBaseForm } from './form/bo-base-form/bo-base-form';

//
import { EditorModule } from '@tinymce/tinymce-angular';
import { BOEditorCtrl } from './bo-editor/bo-editor.ctrl';

import { BOModalDialog, BOModalDialogService } from './popup/bo-modal-dialog/index';

import { BOShowHideForm } from './query-form-ctrls/bo-showhide-form/bo-showhide-form';
import { BOSearchKeywordForm } from './query-form-ctrls/bo-searchkeyword-form/bo-searchkeyword-form';
import { BOSubmitButtonForm } from './query-form-ctrls/bo-submit-button-form/bo-submit-button-form';
import { BOSearchButtonForm } from './query-form-ctrls/bo-search-button-form/bo-search-button-form';
import { BOPeriodForm } from './query-form-ctrls/bo-period-form/bo-period-form';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BsDatepickerModule, TimepickerModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';

// form ctrl
import { BSTooltipCtrl } from './form-ctrls/bs-tooltip.ctrl/bs-tooltip.ctrl';
import { BSCheckBoxFormCtrl } from './form-ctrls/bs-checkbox.ctrl/bs-checkbox.ctrl';
import { BSInputFormCtrl } from './form-ctrls/bs-input.ctrl/bs-input.ctrl';
import { BSGoodsInputCtrl } from './form-ctrls/bs-goods-input.ctrl/bs-goods-input.ctrl';

import { BSGroupInputFormCtrl } from './form-ctrls/bs-group-input.ctrl/bs-group-input.ctrl';
import { BSInputConfig } from './form-ctrls/bs-group-input.ctrl/bs-input-config';
import { BSInputTitleFormCtrl } from './form-ctrls/bs-input-title.ctrl/bs-input-title.ctrl';
import { BSTitleLabelCtrl } from './form-ctrls/bs-title-label.ctrl/bs-title-label.ctrl';
import { BSSelectFormCtrl } from './form-ctrls/bs-select.ctrl/bs-select.ctrl';
import { BSSelectOptionConfig } from './form-ctrls/bs-select.ctrl/bs-option-config';
import { BOPeriodQueryCtrl } from './form-ctrls/bo-period-query.ctrl/bo-period-query.ctrl';
import { BOPeriodInputCtrl } from './form-ctrls/bo-period-input.ctrl/bo-period-input.ctrl';

import { BOProviderQueryView } from './form-ctrls/bo-provider-query.view/bo-provider-query.view';

import { BODateTimeInputCtrl } from './form-ctrls/bo-date-time-input.ctrl/bo-date-time-input.ctrl';
import { BSDateTimeOptionConfig } from './form-ctrls/bo-date-time-input.ctrl/bo-date-time-input-config';

import { BOImageInputCtrl } from './form-ctrls/bo-image-input.ctrl/bo-image-input.ctrl';
import { BOFileInputCtrl } from './form-ctrls/bo-file-input.ctrl/bo-file-input.ctrl';

import { BSPeriodOptionConfig } from './form-ctrls/bo-period-query.ctrl/bo-period-query-config';
import { BSPeriod2OptionConfig } from './form-ctrls/bo-period-input.ctrl/bo-period-input-config';

// query form ctrl
import { BOGroupCheckBoxCtrl } from './query-form-ctrls/bo-group-checkbox-ctrl/bo-group-checkbox-ctrl';
import { BOCheckBoxConfig } from './query-form-ctrls/bo-group-checkbox-ctrl/bo-checkbox-config';

// validators
import { BSNumberValidatorDirective } from './form/validator/bs-validators';

//
import { ServiceLocator } from './core/service-locator';

// framework
//import { BSDatatableController, BOBaseQueryFormController, BSUpdateFormController, BSDatatableQueryPageController } from './framework/index';

import { SendEmailCreatePopup, SendEmailCreatePopupService } from '../providers/popups/send-email-create.popup';
import { SendSMSCreatePopup, SendSMSCreatePopupService } from '../providers/popups/send-sms-create.popup';


import { GoodsSingleSelectPopupService, GoodsSingleSelectPopup } from './popup/goods-single-select.popup/index';
import { GoodsMultiSelectPopupService, GoodsMultiSelectPopup } from './popup/goods-multi-select.popup/index';
import { ReviewSingleSelectPopupService, ReviewSingleSelectPopup } from './popup/review-single-select.popup/index';
import { CategorySelectPopupService, CategorySelectPopup } from './popup/category-select-popup/index';
import { ModalGoodsQueryForm } from './popup/goods-single-select.popup/index';
import { ModalGoodsListPage } from './popup/goods-single-select.popup/modal-goods-list/modal-goods-list.page';
import { ModalReviewQueryForm } from './popup/review-single-select.popup/index';
import { ModalReviewListPage } from './popup/review-single-select.popup/modal-review-list/modal-review-list.page';
import { ModalGoodsDragListPage } from './popup/goods-multi-select.popup/modal-goods-drag-list/modal-goods-drag-list.page';

import { MemberSelectPopupService, MemberSingleSelectPopup } from './popup/member-single-select.popup/index';
import { ModalMemberQueryForm } from './popup/member-single-select.popup/index';
import { ModalMemberListPage } from './popup/member-single-select.popup/modal-member-list/modal-member-list.page';
import { CouponCopyPopupService, CouponCopyPopup } from './popup/coupon-copy.popup/index';
import { ExcelTemplatePopupService, ExcelTemplatePopup } from './popup/excel-template.popup/index';

import { DataTableModule } from './data-table/index';
import { BOColorChip } from './bo-color-chip/bo-color-chip';

import { BOCategoryMultiSelectView } from './view/bo-category-multi-select.view/bo-category-multi-select.view';
import { BOGoodsMultiSelectView } from './view/bo-goods-multi-select.view/bo-goods-multi-select.view';

import { GoodsListItemView } from './view/bo-goods-list-item.view/goods-list-item.view';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BSCommonModule,
    UiSwitchModule,
    NgbModule,
    RouterModule,
    DataTableModule,
    BSButtonModule,

    DndModule.forRoot(),

    // bootsctrap
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    ModalModule.forRoot(),

    // tinymce editor
    EditorModule
  ],
  declarations: [
    BOEditorCtrl,
    BOColorChip,
    BOModalDialog,

    BOPageHeaderComponent,
    BOPagePaddingComponent,
    BOPageButtonComponent,
    BOButtonCollection,
    BOPageButtonConfig,
    BOSideMenuComponent,

    BSUnderconstructorPageComponent,
    BS404ErrorPageComponent,
    // query form ctrl
    BSCheckBoxFormCtrl,
    BOBaseForm,
    BOShowHideForm,
    BOSubmitButtonForm,
    BOSearchButtonForm,
    BOSearchKeywordForm,
    BOPeriodForm,
    BOGroupCheckBoxCtrl,
    BOCheckBoxConfig,

    // form ctrl
    BSTooltipCtrl,
    BSInputFormCtrl,
    BSGoodsInputCtrl,
    BSGroupInputFormCtrl,
    BSInputConfig,
    BSInputTitleFormCtrl,
    BSTitleLabelCtrl,
    BSSelectFormCtrl,
    BSSelectOptionConfig,
    BOPeriodQueryCtrl,
    BOProviderQueryView,

    BOPeriodInputCtrl,
    BODateTimeInputCtrl, BSDateTimeOptionConfig,
    BOImageInputCtrl,
    BOFileInputCtrl,

    BSPeriodOptionConfig,
    BSPeriod2OptionConfig,
    // validator
    BSNumberValidatorDirective,
    CouponCopyPopup,
    ExcelTemplatePopup,
    SendEmailCreatePopup,
    SendSMSCreatePopup,

    GoodsSingleSelectPopup,
    GoodsMultiSelectPopup,
    CategorySelectPopup,
    ReviewSingleSelectPopup,
    MemberSingleSelectPopup,

    ModalGoodsListPage,
    ModalGoodsQueryForm,

    ModalReviewListPage,
    ModalReviewQueryForm,

    ModalGoodsDragListPage,

    ModalMemberListPage,
    ModalMemberQueryForm,

    BOCategoryMultiSelectView,
    BOGoodsMultiSelectView,

    GoodsListItemView

  ],
  exports:[
    DndModule,
    
    BOEditorCtrl,
    BOColorChip,

    BSButtonModule,

    BOPageHeaderComponent,
    BOPagePaddingComponent,
    BOPageButtonComponent,
    BOButtonCollection,
    BOPageButtonConfig,
    BOSideMenuComponent,

    // query form ctrl
    BOBaseForm,
    BSCheckBoxFormCtrl,
    BOShowHideForm,
    BOSubmitButtonForm,
    BOSearchButtonForm,
    BOSearchKeywordForm,
    BOPeriodForm,
    BOGroupCheckBoxCtrl,
    BOCheckBoxConfig,

    // form ctrl
    BSInputFormCtrl,
    BSGoodsInputCtrl,
    BSTooltipCtrl,
    BSGroupInputFormCtrl,
    BSInputConfig,
    BSInputTitleFormCtrl,
    BSTitleLabelCtrl,
    BSSelectFormCtrl,
    BSSelectOptionConfig,
    BOPeriodQueryCtrl,
    BOProviderQueryView, 
    
    BOPeriodInputCtrl,
    BODateTimeInputCtrl, BSDateTimeOptionConfig,
    BOImageInputCtrl,
    BOFileInputCtrl,

    BSPeriodOptionConfig,
    BSPeriod2OptionConfig,
    BSNumberValidatorDirective,
    BSButtonModule,

    BSUnderconstructorPageComponent,
    BS404ErrorPageComponent,
    CouponCopyPopup,
    ExcelTemplatePopup,
    GoodsSingleSelectPopup,
    ReviewSingleSelectPopup,
    CategorySelectPopup,
    MemberSingleSelectPopup,

    BOCategoryMultiSelectView,
    BOGoodsMultiSelectView,

    GoodsListItemView
    
  ],
  providers: [
    //Api,
    ProviderStore,
    ConfigStore,
    AdminStore,

    // store > order
    OrderStore,
    OrderListStore,
    OrderShipmentStore,
    OrderRefundStore,
    OrderReturnStore,

    BSDatatableStore,
    BSBaseStore,
    PopularStore,
    RecommendStore,
    AutoSearchStore,
    BasicSearchStore,
    CouponStore,
    TreeStore,
    ProgramStore,
    BrandStore,
    ProgramBannerStore,
    MainEventBannerStore,
    MainBrandBannerStore,
    MainStarAuctionStore,
    MainClipStore,
    MainBannerStore,
    MainNewStore,
    MainBrandStore,
    MainBrandTitleStore,
    DisplayReviewBestStore,
    BrandBannerStore,
    MainReviewStore,
    MainStarGoodsStore,
    MainSceneGoodsStore,
    GoodsStore,
    MyctMainBannerStore,
    MyctBannerStore,
    MyctClipStore,
    MyctBestGoodsStore,
    EventStore,
    //GoodsQNAStore,
    GoodsReviewStore,
    EmailStore,
    SMSStore,
    GoodsBestReviewStore,
    GoodsInfoStore,
    GoodsSubInfoStore,
    MyctProgramGoodsStore,
    CategoryStore,
    AuctionStore,
    KakaoStore,
    PrivatePaymentStore,
    SaleStore,
    StatisticsStore,
    StockStore,
    MemberListStore,

    // service
    SendEmailCreatePopupService,
    SendSMSCreatePopupService,
    BOModalDialogService,

    CouponCopyPopupService,
    ExcelTemplatePopupService,

    GoodsSingleSelectPopupService,
    ReviewSingleSelectPopupService,
    GoodsMultiSelectPopupService,
    CategorySelectPopupService,
    MemberSelectPopupService

  ],
  entryComponents: [
    SendEmailCreatePopup,
    SendSMSCreatePopup,
    CouponCopyPopup,
    ExcelTemplatePopup,
    GoodsSingleSelectPopup,
    ReviewSingleSelectPopup,
    GoodsMultiSelectPopup,
    CategorySelectPopup,
    MemberSingleSelectPopup,

    SendSMSCreatePopup,
    BOModalDialog

  ]
})
export class BOCommonModule {

  constructor() {

    ServiceLocator.injector = Injector.create(
      Object.keys(services).map(key => ({
        provide: services[key].provide,
        useFactory: services[key].useFactory,
        useClass: services[key].provide,
        deps: services[key].deps
      }))
    );
  }

}

// providers
import { Injector } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Http, RequestOptions, XHRBackend, Headers, URLSearchParams } from '@angular/http';

import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';



//import { BSBaseStore } from '@app/common/store/bs-base.store';

// Service 상속문제를 해결하기 위해 만든 코드
export const services: {[key: string]: {
  provide: any,
  deps: any[],
  useFactory?:any,
  useClass?: any,
  }
} = {
  'FormBuilder': { provide: FormBuilder, deps: [] },
  'Ng4LoadingSpinnerService': { provide: Ng4LoadingSpinnerService, deps: [] },
  'ActivatedRoute': { provide: ActivatedRoute, deps: [] },
};

export * from './query-form-ctrls/bo-group-checkbox-ctrl/index';
export * from './core/service-locator';
export * from './form/validator/bs-validators';
export * from './core/device';
