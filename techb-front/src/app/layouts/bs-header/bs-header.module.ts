
import { CommonModule } from '@angular/common';
import { BSCommonModule } from '../../../common/bs-common.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor} from '@angular/forms';

//import { BSHeaderComponent } from '../bs-header/bs-header.component';
import { BSHeaderMobileView } from '../bs-header/bs-header.view.m';

// import { AccountBoxComponent } from './bs-account-box/bs-account-box.component';
import { BsLogoComponent } from './bs-logo/bs-logo.component';
import { BsTopMenuComponent } from './bs-top-menu/bs-top-menu.component';
import { BsLeftMenuComponent } from './bs-left-menu/bs-left-menu.component';

import { ResponsiveModule } from 'ng2-responsive';
import { OrderStore } from './../../store/order.store';
//import { MenuStore } from './../../store/menu.store';
// import { SearchStore } from './../../store/search.store';
// import { BSSearchPopupComponent } from './bs-search-popup/bs-search-popup.component';
// import {GamoduleModule} from '../../modules/directives/ga/directive.module';

// import { GoodsSearchBoxComponent2 } from './goods-search-box/goods-search-box';

@NgModule({
  declarations: [
    BSHeaderMobileView,
    BsLogoComponent,
    BsTopMenuComponent,
    BsLeftMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule,
    NgbModule,
    ResponsiveModule,
    BSCommonModule,

    // 한성희 tracking log
    //GamoduleModule
  ],
  exports : [
    //BSHeaderComponent,
    BSHeaderMobileView,
    //BSSearchPopupComponent
  ],
  providers: [
    OrderStore,
    //MenuStore,
    //SearchStore,
  ],
})
export class BsHeaderModule { }
