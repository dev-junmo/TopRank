import { Component  } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'goods-query-form',
  templateUrl: './goods-query-form.html',
  styleUrls: ['./goods-query-form.css'],
})
export class GoodsQueryForm extends BOBaseQueryFormController {

    public isShowMore;
    constructor() {
        super();
      }

    preparedFormControlsConfig() {

        let config = {
         goods_namd : [],
         goods_price : [],
         goods_platform : [],
         store_name : [],
         goods_category_name : [],
         goods_uri : []

        };

        return config;
    }

    onClickShowMore() {}
}

//////////////////////////////////////////////////////////
