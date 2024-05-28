import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { CategoryStore } from '@app/common/store/category.store';

@Component({
  selector: 'modal-review-query-form',
  templateUrl: './modal-review-query-form.html',
  styleUrls: ['./modal-review-query-form.css'],
})
export class ModalReviewQueryForm extends BOBaseQueryFormController {

 constructor(public categoryStore: CategoryStore,) {
   super();

 }

 preparedFormControlsConfig() {

    let config = {
      // boardid:'notice',
      hidden: '',
      keyword: '',
      // 'paging[page]':1,
      // 'paging[limit]':10,
      // 'order[0][column]':[],
      // 'order[0][dir]':'desc',
      // 'regist_date[min]':[],
      // 'regist_date[max]':[],
      'hidden[0]':'1',
      'hidden[1]':[]
    };
        return config;
  }


}

//////////////////////////////////////////////////////////
