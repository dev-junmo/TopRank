import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { AppConfigService } from '../../../../../../providers/service/app-config.service';

@Component({
  selector: 'board-goods-qna-query-form',
  templateUrl: './board-goods-qna-query-form.html',
  styleUrls: ['./board-goods-qna-query-form.css'],
})
export class BoardGoodsQNAQueryForm extends BOBaseQueryFormController {

  @Input() hasStepQuery: boolean = true;

 constructor(public appConfig: AppConfigService) {
   super();
 }

  options = [];

 preparedFormControlsConfig() {

   let config = {
    boardid:'notice',
    secret: '',
    search_text: '',
    reply: ''
    // 'paging[page]':1,
    // 'paging[limit]':10,
    // 'order[0][column]':[],
    // 'order[0][dir]':'desc',
    // 'period': [],

   };

   return config;
  }


  // override : submit 전 처리
  // public willSubmit(query) {
  //     console.log("OrderListQueryForm willSubmit query = ", this.options);
  //     return query;
  // }

}
///////////////////////////////////////////////////////////////////

