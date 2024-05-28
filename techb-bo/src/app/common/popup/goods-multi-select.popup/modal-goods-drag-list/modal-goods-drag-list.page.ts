// basic
import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

// 내가 만들어 사용하는 store , BoardContentStore는 제거해주세요.
import { GoodsStore } from '@app/common/store/goods.store';

@Component({
  selector: 'modal-goods-drag-list-page',
  templateUrl: './modal-goods-drag-list.page.html',
  styleUrls: ['./modal-goods-drag-list.page.css'],
  //encapsulation: ViewEncapsulation.None
})
export class ModalGoodsDragListPage extends BSDatatableController {

    //@Output() targetGoods = new EventEmitter<string>();
    @Input() isGift: boolean = false;
    @Input() providerSeqs;
    @Input() query: any = null;
    @ViewChild(DataTable) dataTable: DataTable;

    ///////////////////////////////////////////////////////////////////////////////
    // 리스트에 맞게  'BoardContentStore' 부분을 자신의 스토어를 만들어서 교체해주세요.
    // 그 스토어에서 필요한 API 제어를 확장합니다.

    constructor(
        public goodsStore: GoodsStore,
        public datatableStore: BSDatatableStore,
        alert: BSAlertService,
        private modal: BSModalService,
        protected router: Router,
        activateRouter: ActivatedRoute
        ) {
        super(datatableStore, router, activateRouter, alert);

        console.log("GoodsListPage:constructor");
    }

    // sourceList: Widget[] = [
    //     new Widget('1'), new Widget('2'),
    //     new Widget('3'), new Widget('4'),
    //     new Widget('5'), new Widget('6')
    // ];

    targetList: Widget[] = [];

    initController(config: any) {
        console.log("BSDatatableController::initController command=", config);


        config.store.command = 'admin/shop/goods/goods';

        this.dataTableParams = {sortBy: 'goods_seq', sortAsc: false, offset: 0, limit: 100};

        if(this.isGift == true) {
            config.store.command = 'admin/shop/goods/gift ';
        }

        if (this.providerSeqs) {

            if (!this.query) {
                this.query = {};
            }            

            let i = 0;
            for(let seq of this.providerSeqs) {
                if (seq == 1) {
                    this.query['provider_seq[]'] = seq;
                } else {
                    this.query['provider_seq[' + i + ']'] = seq;
                }
                
                i++;
            } 

            console.log('ModalGoodsDragListPage::initController providerSeqs, qeury =>', 
                this.providerSeqs, this.query);
        }

        config.usePageLocationParams = false;
        return config;
    }


    ////////////////////////////////////////////////////////
    // BSDatatableController Override
    // list Query Parma

    public preparedParams(params) {

        // 리스트로 params를 전달하기 전에 여기서 수정합니다.

        return params;
    }
    
    //////////////////////////////
    // 데이타테이블 버튼 클릭 시

    onDblclickSource(event) {
        console.log('onDblclickSource targetList, event =>', this.targetList, event);

        if (this.existInList(event)) {
            this.alert.show('목록에 동일한 상품이 이미 존재합니다.');
        } else {            
            this.targetList.push(event);

            //this.items에서 제거
            let i = 0;
            for(let item of this.items) {
                if (item.goods_seq == event.goods_seq) {
                    this.items.splice(i, 1);
                    return;
                }

                i++;
            }
        }                
    }

    onDblclickTarget(target) {

        console.log('onDblclickTarget targetList, event =>', this.targetList, event);
      
        //this.items에서 제거
        let i = 0;
        for(let item of this.targetList) {
            if (item.goods_seq == target.goods_seq) {
                this.items.splice(0, 0, item);
                this.targetList.splice(i, 1);

                return;
            }
            i++;
        }                    
    }

    onDropSuccess(event: any) {
        console.log('onDropSuccess targetList, event =>', this.targetList, event);

        // if (this.existInList(event.dragData)) {
        //     this.alert.show('목록에 동일한 상품이 이미 존재합니다.');
        // } else {
        //     this.targetList.push(event.dragData);
        // }            
        
    }

    existInList(goods) : boolean {

        let exist = false;

        for (let _goods of this.targetList) {
            
            if (_goods.goods_seq == goods.goods_seq) {
                return true;
            }
        }

        return exist;
    }

    // onDragEnter(event: any) {
    //     console.log('onDragEnter event =>', event);
    // }
}

class Widget {
  constructor(public name: string, public goods_seq) {

  }
}
