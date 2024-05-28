import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';
import { BSCommonModule } from '@bricks/common/bs-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';

///////////////////////////////////////////////////////////////////

import { LogRoutingModule } from './log.routing';
import { LogComponent } from './log.component';
import { BasicLogComponent } from './basic-log/basic-log.component';
import { LogStore } from '@app/common/store/log.store';
import { LogListComponent } from './log/log.component';
import { LogListQueryFormComponent } from './log/log-query-form/log-list-query-form.component';
@NgModule({
  imports: [
    CommonModule,
    LogRoutingModule,
    BOCommonModule,
    BSCommonModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
      LogComponent,
      BasicLogComponent,
      LogListComponent,
      LogListQueryFormComponent
  ],
  providers: [
      LogStore
  ],
  entryComponents: [
  ]
})
export class LogModule { }
