//////////////////////////////////////////////
// todo : 이 모듈은 폐기 해야 함

import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { BSSidemenu } from './bs-sidemenu/sidemenu.component';
//import { BSCommonRoutingModule } from './bs-common.routings';
// import { BSButton } from './data-table/components/button/bs-button';
// import { Demo1DataTableHeader } from './demo1/header/header';
// import { DataTableDemo2 } from './demo2/data-table-demo2';
// import { DataTableDemo1Remote } from './demo1/data-table-demo1-remote';
// import { DataTableModule } from './data-table/index';
// import { DataTableDemo1 } from './demo1/data-table-demo1';
//import { BsChartComponent } from './bs-chart/bs-chart.component';
// import { BsChartModule } from './bs-chart/bs-chart.module';
// import { BsFilterformModule } from './bs-filterform/bs-filterform.module';
//import { BSAccountModule } from './account/bs-account.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [],
  declarations: [
    // BSComment,
    // BSComments,
    // BSListView,
    // BSList,
    // BSPagination,
    // BSGridList,
    // BSGridListItem,
    // BSListItem,
    // BSListHeader,
    // DataTableDemo1,
    // DataTableDemo1Remote,
    // DataTableDemo2,
    // Demo1DataTableHeader,
    // BSButton,
    BSSidemenu,

  ],
  exports: [

    // BSComment,
    // BSComments,
    // BSListView,
    // BSList,
    // BSPagination,
    // BSGridList,
    // BSGridListItem,
    // BSListItem,
    // BSListHeader,
    // DataTableDemo1,
    // DataTableDemo1Remote,
    // DataTableDemo2,
    // Demo1DataTableHeader,
    // BSButton,
    BSSidemenu,

  ]
})
export class BSCommonUIModule { }


/*

  declarations : 해당 모듈에서 쓰는 컴포넌트
  imports : 해당 모듈에서 사용하는 모듈들.
  exports : 이 모듈을  쓰는 쪽에서 사용한 컴포넌트를 정의함, 어차피 모듈을 임포트하면 이 곳에 정의할 필요 없음
  providor : 이 모듈에서 사용할 프로바이더

*/
