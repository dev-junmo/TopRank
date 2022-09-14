import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'event-planshop-query-form',
  templateUrl: './event-planshop-query-form.html',
  styleUrls: ['./event-planshop-query-form.css'],
})
export class EventPlanShopQueryForm extends BOBaseQueryFormController {

 constructor() {
   super();
 }
 
 preparedFormControlsConfig() {

  let config = {
      hidden: [],
      regist_date: [],
      ext_date: [],
      search_text: [],
   };

   return config;
  } 
}
/////////////////////////////////////////////////////////////

