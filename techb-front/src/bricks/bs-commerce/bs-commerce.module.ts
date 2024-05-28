import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BSCommerceDataProcesorService } from './service/bs-commerce-data-procesor.service';

@NgModule({
  imports: [
    CommonModule,
    // 한성희 tracking log
    
  ],
  declarations: [

  ],
  providers: [
    BSCommerceDataProcesorService
  ]

})
export class BSCommerceModule { }
