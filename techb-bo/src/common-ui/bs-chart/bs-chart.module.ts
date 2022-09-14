import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsChartComponent } from './bs-chart.component';


@NgModule({
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports:[
    BsChartComponent
  ],
  declarations: [
    BsChartComponent
  ]
})
export class BsChartModule { }
