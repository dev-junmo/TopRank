import { CommonModule } from '@angular/common';
import { AppCommonModule } from '../../../../../../common/app-common.module';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { MainRoutingModule } from '../../../../main.routing';
// import { MainComponent } from './main.component';

////////////////////////////////////////////////////////////////////////////////////////////////

import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive';

// import { BoardContentStore } from './../../store/board-content.store';
// import { CategoryStore } from '../../store/category.store';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface , SwiperModule} from 'ngx-swiper-wrapper';
import { BSCommonModule } from '../../../../../../../common/bs-common.module';
// const SWIPER_CONFIG: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// }
import { ResponsiveDefinition } from '../../../../../../../environments/environment';

import { BoardComponent } from './board.component';
import { NoticePageComponent } from './pages/notice/notice.page';
import { BoardRoutingModule } from './board.routing';
import { FaqPageComponent } from './pages/faq/faq.page';



@NgModule({
  imports: [
    BoardRoutingModule,
    //SwiperModule,
    //BSCommonUIModule,
    BSCommonModule,
    CommonModule,
    ResponsiveModule,
    SwiperModule,
    AppCommonModule,
    FormsModule,
  ],
  
  declarations: [
    BoardComponent,

    NoticePageComponent,
    FaqPageComponent,

    // Views


    /////////////////////////////////////////////////
 
  ],
  providers: [
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition },
    // GoodsStore,
    // BoardContentStore,
    // CategoryStore,
    //MainStore
  ],
  exports : [
    
  ]
})
export class BoardModule { }
