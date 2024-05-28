import { BSConfirm } from './bs-confirm-popup/bs-confirm-popup';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder  } from '@angular/forms';

import { BSAlert } from './bs-alert-popup/bs-alert-popup';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { BOCommonModule } from '@app/common/bo-common.module';
import { BSCommonModule } from '@bricks/common/bs-common.module';

import { HomeRoutingModule } from './home.routing';
import { BsChartModule } from '@bricks/ui/bs-chart/bs-chart.module';

import { HomeComponent } from './home.component';
import { ModalModule } from 'ngx-bootstrap';

import { DashBoardStore } from '@app/common/store/dashBoard.store';
import { LogStore } from '@app/common/store/log.store';

import { DatePipe } from '@angular/common';

import { HomeStatusComponent } from './status/status.component';
import { HomeDashboardComponent } from './dashboard/dashboard.component';

// import { CommonModule } from '@angular/common';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BSSideMenuModule } from '../layouts/bs-side-menu/bs-side-menu.module';
// import { BsModalPopupComponent } from './bs-modal-popup/bs-modal-popup.component';
// import { LoginComponent } from './auth/login.component';
// import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HomeRoutingModule,
    //BSSideMenuModule,
    BsChartModule,

    ModalModule.forRoot(),
    BOCommonModule,
    BSCommonModule,
    CommonModule,
    // AlertModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    HomeStatusComponent,
    HomeDashboardComponent,
    //BsModalPopupComponent,
    BSAlert,
    BSConfirm,

  ],
  providers: [
    DashBoardStore,
    LogStore,
    DatePipe
  ]

})
export class HomeModule { }
