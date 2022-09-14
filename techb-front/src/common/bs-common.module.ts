////////////////////////////////////////////////////////////////////
//  BSCommonModule
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor, FormBuilder} from '@angular/forms';


import { BSApi } from './core/bs-api';
import { BSLoadingService } from './core/bs-loading';
import { BSFileUploader } from './core/bs-fileuploader';
import { BSUUIDService } from './core/bs-uuid.service';

// service
import { BSBankAccountService } from './service/bs-bank-account.service';
import { BSScriptLoaderService } from './service/bs-script-loader.service';
// pipe
import { BSAuthToStringPipe } from './pipe/auth.pipe';
import { BSHighlightKeyowrdPipe } from './pipe/string.pipe';
import { BSRemoveTagPipe, BSPasswordPipe, BSLineBreakPipe, BSStringLimitPipe, SanitizeHtmlPipe, ReplaceHtmlToTextPipe } from './pipe/string.pipe';
import { BSDateKrPipe } from './pipe/date.pipe';
import { SafeHttpUrlPipe } from './pipe/http.pipe';
import { FieldTransPipe } from './pipe/field.trans.pipe';

// ui
import { RatingModule } from 'ngx-bootstrap';
import { BSRatingComponent } from './ui/bs-rating/bs-rating.component';
import { BSTubeBar } from './ui/bs-tube-bar/bs-tude-bar'

//import { NgDaumAddressModule } from 'ng2-daum-address';
import { BSDaumAddressBtn } from './ui/bs-daum-address-btn/bs-daum-address-btn';
import { DaumAddressComponent } from './ui/bs-daum-address-btn/daum-address.component';

import { BSSliderComponent } from './ui/bs-slider-component/bs-slider-component';


// ui > alert, confirm, modal popup
import { BSAlertComponent, BSAlertService } from './ui/bs-alert/index';
import { BSModal, BSModalService } from './ui/bs-modal/index';
import { BSModalDialog, BSModalDialogService } from './ui/bs-modal-dialog/index';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EditorModule } from '@tinymce/tinymce-angular';
import { BSEditorCtrl } from './ui/bs-editor/bs-editor.ctrl';

// ui > list
// import { BSListCtrl } from './ui/bs-list-ctrl/bs-list-ctrl';
// import { BSList } from './ui/bs-list-ctrl/bs-list/bs-list';
// import { BSListHeader } from './ui/bs-list-ctrl/bs-list/bs-list-header/bs-list-header';
// import { BSListItem } from './ui/bs-list-ctrl/bs-list/bs-list-item/bs-list-item';
// import { BSGridListItem } from './ui/bs-list-ctrl/bs-grid-list/bs-grid-list-item/bs-grid-list-item';
// import { BSGridList } from './ui/bs-list-ctrl/bs-grid-list/bs-grid-list';
// import { BSComments } from './ui/bs-list-ctrl/bs-comments/bs-comments';
// import { BSComment } from './ui/bs-list-ctrl/bs-comments/bs-comment/bs-comment';
import { BSPagination } from './ui/bs-list-ctrl/bs-pagination/bs-pagination';
import { ResponsiveModule } from 'ng2-responsive';


import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { IfMobileDirective, IfDesktopDirective, IfOnlyMobileDirective, IfTabletDirective } from './directive/responsive.directive';
import { TelephoneTypeDirective } from './directive/telephone-type.directive';
import { BSDeviceService } from './service/bs-device.service';


// bo에서 가져온 모듈

import { BOPageButtonComponent } from './bo-page-button/bo-page-button.component';

// form
import { BOBaseForm } from './form/bo-base-form/bo-base-form';

//
//import { EditorModule } from '@tinymce/tinymce-angular';
//import { BOEditorCtrl } from './bo-editor/bo-editor.ctrl';

//import { BOModalDialog, BOModalDialogService } from './popup/bo-modal-dialog/index';

import { BOShowHideForm } from './query-form-ctrls/bo-showhide-form/bo-showhide-form';
import { BOSearchKeywordForm } from './query-form-ctrls/bo-searchkeyword-form/bo-searchkeyword-form';
import { BOSubmitButtonForm } from './query-form-ctrls/bo-submit-button-form/bo-submit-button-form';
import { BOSearchButtonForm } from './query-form-ctrls/bo-search-button-form/bo-search-button-form';
import { BOPeriodForm } from './query-form-ctrls/bo-period-form/bo-period-form';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap'; 

// form ctrl
import { BSTooltipCtrl } from './form-ctrls/bs-tooltip.ctrl/bs-tooltip.ctrl';
import { BSCheckBoxFormCtrl } from './form-ctrls/bs-checkbox.ctrl/bs-checkbox.ctrl';
import { BSInputFormCtrl } from './form-ctrls/bs-input.ctrl/bs-input.ctrl';

import { BSGroupInputFormCtrl } from './form-ctrls/bs-group-input.ctrl/bs-group-input.ctrl';
import { BSInputConfig } from './form-ctrls/bs-group-input.ctrl/bs-input-config';
import { BSInputTitleFormCtrl } from './form-ctrls/bs-input-title.ctrl/bs-input-title.ctrl';
import { BSTitleLabelCtrl } from './form-ctrls/bs-title-label.ctrl/bs-title-label.ctrl';
import { BSSelectFormCtrl } from './form-ctrls/bs-select.ctrl/bs-select.ctrl';
import { BSSelectOptionConfig } from './form-ctrls/bs-select.ctrl/bs-option-config';
import { BOPeriodQueryCtrl } from './form-ctrls/bo-period-query.ctrl/bo-period-query.ctrl';
import { BOPeriodInputCtrl } from './form-ctrls/bo-period-input.ctrl/bo-period-input.ctrl';

// import { BODateTimeInputCtrl } from './form-ctrls/bo-date-time-input.ctrl/bo-date-time-input.ctrl';
//import { BSDateTimeOptionConfig } from './form-ctrls/bo-date-time-input.ctrl/bo-date-time-input-config';

import { BOImageInputCtrl } from './form-ctrls/bo-image-input.ctrl/bo-image-input.ctrl';
import { BOFileInputCtrl } from './form-ctrls/bo-file-input.ctrl/bo-file-input.ctrl';

import { BSPeriodOptionConfig } from './form-ctrls/bo-period-query.ctrl/bo-period-query-config';
import { BSPeriod2OptionConfig } from './form-ctrls/bo-period-input.ctrl/bo-period-input-config';

// query form ctrl
import { BOGroupCheckBoxCtrl } from './query-form-ctrls/bo-group-checkbox-ctrl/bo-group-checkbox-ctrl';
import { BOCheckBoxConfig } from './query-form-ctrls/bo-group-checkbox-ctrl/bo-checkbox-config';

// validators
import { BSNumberValidatorDirective } from './form/validator/bs-validators';

const SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
  }


@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpModule,
    FormsModule,
 
    // ui
    RatingModule,
    ModalModule.forRoot(),

    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),

    //NgDaumAddressModule,
    ResponsiveModule,

    EditorModule,

    FormsModule,
    ReactiveFormsModule,

    SwiperModule,
    DeviceDetectorModule.forRoot(),
  ],
  declarations: [

    // pipe
    BSAuthToStringPipe,
    BSHighlightKeyowrdPipe,
    BSRemoveTagPipe,
    BSPasswordPipe,
    BSDateKrPipe,
    BSLineBreakPipe,
    BSStringLimitPipe,
    SanitizeHtmlPipe,
    ReplaceHtmlToTextPipe,
    SafeHttpUrlPipe,
    FieldTransPipe,

    // ui
    BSRatingComponent,
    BSTubeBar,
    BSDaumAddressBtn,
    DaumAddressComponent,

    // ui > modal
    BSAlertComponent, BSModal, BSModalDialog,

    // ui > page
    BSPagination,

    BSSliderComponent,

    BSEditorCtrl,

    // directive
    IfMobileDirective, IfDesktopDirective, IfOnlyMobileDirective, IfTabletDirective,
    TelephoneTypeDirective,
    //BSListCtrl, BSList, BSListHeader, BSListItem

    /////////////////////////
    // BO

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
    BSGroupInputFormCtrl,
    BSInputConfig,
    BSInputTitleFormCtrl,
    BSTitleLabelCtrl,
    BSSelectFormCtrl,
    BSSelectOptionConfig,
    BOPeriodQueryCtrl,

    BOPeriodInputCtrl, 
    //BODateTimeInputCtrl, BSDateTimeOptionConfig,
    BOImageInputCtrl,
    BOFileInputCtrl,

    BSPeriodOptionConfig,
    BSPeriod2OptionConfig,
    // validator
    BSNumberValidatorDirective,
     
    BOPageButtonComponent
  ],
    exports:[

        // pipe
        BSHighlightKeyowrdPipe,
        BSRemoveTagPipe,
        BSPasswordPipe,
        BSDateKrPipe,
        BSAuthToStringPipe,
        FieldTransPipe,
        BSLineBreakPipe,
        BSStringLimitPipe,
        SanitizeHtmlPipe,
        ReplaceHtmlToTextPipe,
        SafeHttpUrlPipe,
        // ui
        BSRatingComponent,
        BSTubeBar,
        BSDaumAddressBtn, DaumAddressComponent,
        BSPagination,
        BSSliderComponent,

        // directiv
        IfMobileDirective, IfDesktopDirective, IfOnlyMobileDirective, IfTabletDirective,
        TelephoneTypeDirective,

        /////////////////////////
        // BO

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
        BSGroupInputFormCtrl,
        BSInputConfig,
        BSInputTitleFormCtrl,
        BSTitleLabelCtrl,
        BSSelectFormCtrl,
        BSSelectOptionConfig,
        BOPeriodQueryCtrl,

        BOPeriodInputCtrl,
        //BODateTimeInputCtrl, BSDateTimeOptionConfig,
        BOImageInputCtrl,
        BOFileInputCtrl,

        BSPeriodOptionConfig,
        BSPeriod2OptionConfig,
        // validator
        BSNumberValidatorDirective,
        BOPageButtonComponent
    ],
    providers: [
        BSApi,
        BSLoadingService,
        BSUUIDService,
        BSFileUploader,
        BSAlertService, BSModalService, BSModalDialogService,
        SafeHttpUrlPipe,
        BSBankAccountService,
        BSScriptLoaderService,
        BSDeviceService
    ],
    entryComponents: [
        BSAlertComponent, BSModal, BSModalDialog
    ],
})

export class BSCommonModule {

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
import { ServiceLocator } from './core/service-locator';

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
//export * from './core/device';

