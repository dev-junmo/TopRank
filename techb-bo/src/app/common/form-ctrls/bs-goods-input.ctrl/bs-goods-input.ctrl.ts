import { Component, OnInit, Input } from '@angular/core';
import { BSInputFormCtrl } from '../bs-input.ctrl/bs-input.ctrl';
import { GoodsSingleSelectPopupService } from '@app/common/popup/goods-single-select.popup/index';

@Component({
  selector: 'bs-goods-input',
  templateUrl: './bs-goods-input.ctrl.html',
  styleUrls: ['./bs-goods-input.ctrl.css']
})
export class BSGoodsInputCtrl extends BSInputFormCtrl {

    constructor(
        private goodsSingleSelectPopupService: GoodsSingleSelectPopupService,
    ) {
        super();
    }

    onInit() {

    }

    onClickSelectGoods() {
        this.goodsSingleSelectPopupService.popup().subscribe((data)=>{

            //console.log("resp = ", this.bsForm.get('goods_seq'), resp.goodsSeq);
            console.log(data);
            if (data) {
                let url = '/goods/view/' + data.goods_seq;
                this.formGroup.get(this.name).setValue(url);
            }
        });
    }
}
