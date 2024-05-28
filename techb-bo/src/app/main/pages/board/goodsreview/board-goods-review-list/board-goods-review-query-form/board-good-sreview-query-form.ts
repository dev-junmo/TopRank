import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { AppConfigService } from '../../../../../../providers/service/app-config.service';

@Component({
  selector: 'board-goods-review-query-form',
  templateUrl: './board-goods-review-query-form.html',
  styleUrls: ['./board-goods-review-query-form.css'],
})
export class BoardGoodsReviewQueryForm extends BOBaseQueryFormController {

    @Input() hasStepQuery: boolean = true;

    constructor(public appConfig: AppConfigService) {
    super();
    }

    options = [];

    preparedFormControlsConfig() {

        let config = {
            // boardid:'notice',
            hidden: '',
            keyword: '',
            score: [],
            // 'paging[page]':1,
            // 'paging[limit]':10,
            // 'order[0][column]':[],
            // 'order[0][dir]':'desc',
            // 'r_date[min]':[],
            // 'r_date[max]':[],
            'hidden[0]':[],
            'hidden[1]':[]
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

