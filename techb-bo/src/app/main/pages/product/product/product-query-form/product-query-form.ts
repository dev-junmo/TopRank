import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
import { CategoryStore } from '@app/common/store/category.store';
import { BrandStore } from '@app/common/store/brand.store';
import { ProgramStore } from '@app/common/store/program.store';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { GoodsIconStore } from '@app/common/store/goods-icon.store';
import { GoodsInfoStore } from '@app/common/store/goods-info.store';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'product-query-form',
  templateUrl: './product-query-form.html',
  styleUrls: ['./product-query-form.css'],
})
export class ProductQueryForm extends BOBaseQueryFormController {

    constructor() {
        super();
      }

    preparedFormControlsConfig() {

        let config = {
        member_seq: [],
        goods_seq: [],
        goods_name: [],
        keyword: [],        
        product_type: [],
        product_period : [],
        auto_extension: []       
        };

        return config;
     }
}
