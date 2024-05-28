import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder ,FormArray } from '@angular/forms';
import { GoodsMultiSelectPopupService } from '../../popup/goods-multi-select.popup/index';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { GoodsStore } from './../../store/goods.store';

@Component({
  selector: 'bo-goods-multi-select-view',
  templateUrl: './bo-goods-multi-select.view.html',
  styleUrls: ['./bo-goods-multi-select.view.css']
})
export class BOGoodsMultiSelectView implements OnInit, AfterViewInit {
 
    public bsForm: FormGroup;

    @Input() public set providers(value) {      
        //alert(value);
        console.log('BOGoodsMultiSelectView::providers value =>', value);
        //this.oriProviders = value;
        let _providers = value.slice();

        console.log('BOGoodsMultiSelectView::providers value =>', value);
        // provider는 세팅했는데 값이 없으면 '본사'
        if (_providers == null) {
            _providers = [];
        }
  
        this.providerSeqs = [];
        for(let provider of _providers) {
            this.providerSeqs.push(provider.seq);
        }
        console.log('BOGoodsMultiSelectView::providers this.providerSeqs =>', this.providerSeqs);
    }

    @Input() public providerSeqs = [];    
    @Input() public selectedGoodsSeqs = [];     
    
    // {
    //     this.selectedGoodsSeqs = goodsSeqs;
    //
    //     // load goods object 
    //     for(let seq of goodsSeqs) {
    //         this.goodsStore.get(seq).subscribe(resp => {
    //             this.selectedGoodsList.push(resp);
    //         });
    //     }
    // }

    // @Output() changeSelectedGoodsSeqs = new EventEmitter();

    //    @Output() resultSelectedGoodsSeqs() {
    //         let seqs = [];
    //         for (let goods of this.selectedGoodsList) {
    //             seqs.push(goods.goods_seq);
    //         }
    //         return seqs;
    //     }

    // type : 실제 goods object 다 담김
    // 그 중 사용되는 필수값
    // { goods_seq, goods_name, provider_seq, image }
    @Input() public selectedGoodsList: Array<any> = [];    
    // data type : [{seq: "139", label: "사방넷TopRank"}]
  

    constructor(
        private fb: FormBuilder,
        private goodsStore: GoodsStore,
        private goodsMultiSelectPopupService: GoodsMultiSelectPopupService,
        private alert: BSAlertService
    ) {

        console.log('BOGoodsMultiSelectView::constructor');
    }

    ngOnInit() {

        //console.assert(this.selectedGoodsList);

        let config = {
            //categories: this.fb.array([]),
        }

        this.bsForm = this.fb.group(config);      
        
        //this.bsForm.patchValue(this._data);

        // this.categoryStore.get().subscribe(resp => {
        //     this.category[1] = resp.list;
        //     this.loadCategory();
        // });

        // selectedGoodsList
    }

    ngAfterViewInit() {

        console.log('BOGoodsMultiSelectView::ngAfterViewInit selectedGoodsSeqs =>', 
            this.selectedGoodsSeqs);

        if (this.selectedGoodsSeqs) {
            for(let seq of this.selectedGoodsSeqs) {

                // 상품 정보를 요청한다.
                this.goodsStore.get(seq).subscribe(resp => {

                    console.log('BOGoodsMultiSelectView::ngAfterViewInit resp =>', resp);

                    if (resp) {
                        this.selectedGoodsList.push(resp);
                    }                    
                });
            }
        }
    }

    // '상품선택' 버튼을 클릭하면 경우 
    onClickGoodsNumber() {
        console.log('onClickGoodsNumber providers =>', this.providerSeqs);        
        this.goodsMultiSelectPopupService.popupWithProvider(this.providerSeqs).subscribe((resp) => {
            if(!resp) { return; }
            console.log('onClickGoodsNumber::goodsMultiSelectPopupService resp, providers =>', resp, this.providerSeqs);
            this.pushGoodsItem(resp);                    
        });
    }

    // 상품 선택에서 제외
    onClickDelGoods(item) {
        const index: number = this.selectedGoodsList.indexOf(item);
        console.log(item);
        this.selectedGoodsList.splice(index, 1);
        this.selectedGoodsSeqs.splice(index, 1);
    }

    /////////////////////////////////////////////////////////////////////////

    pushGoodsItem(newSelectedGoodsList) {

        //console.assert(this.selectedGoodsList);    
        
        // if (!this.selectedGoodsList) {
        //     this.selectedGoodsList = [];
        //     //this.selectedGoodsSeqs = [];
        // }

        //let hasSameGoods = false;

        for(let newGoods of newSelectedGoodsList) {

            let exist = false;
            for(let _goods of this.selectedGoodsList) {
                if (newGoods.goods_seq == _goods.goods_seq) {
                    exist = true;
                    break;
                }
            }

            if (!exist) {

                // 같은 프로바이더 인지?
                if (this.providerSeqs && this.providerSeqs.length > 0) {
                    if (!this.sameProviders(newGoods.provider_seq)) { 
                    
                        console.log('pushGoodsItem2 providerSeqs, goods.provider_seq =>', 
                            this.providerSeqs, newGoods.provider_seq);
    
                        // 본사                                                       
                        if (this.providerSeqs.length == 1 && this.providerSeqs[0] == 1) {
                            this.alert.show("'" + newGoods.goods_name + "'상품은 본사의 상품이 아닙니다.");
                        } else {
                            this.alert.show("'" + newGoods.goods_name + "'상품은 선정된 입점판매자의 상품이 아닙니다.");
                        }                    
                        continue;
                    } 
                }
               
                console.log('pushGoodsItem goods =>', newGoods.provider_seq);
                this.selectedGoodsList.push(newGoods);
                this.selectedGoodsSeqs.push(newGoods.goods_seq);
            }
        }

        console.log('BOGoodsMultiSelectView::pushGoodsItem selectedGoodsList, selectedGoodsSeqs =>', 
            this.selectedGoodsList, this.selectedGoodsSeqs);
        // if (hasSameGoods == true) {
        //     this.alert.show("동일한 상품은 등록할 수 없습니다.");
        // }
    }

    sameProviders(providerSeq) {

        let same: boolean = false;
        for(let seq of this.providerSeqs) {
            if (providerSeq == seq) {
                same = true;
                break;
            }
        }
        return same;
    }    

  
}
