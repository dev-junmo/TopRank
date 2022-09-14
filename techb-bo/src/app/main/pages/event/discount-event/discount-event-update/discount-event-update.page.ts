import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';

import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
import { BoardContentStore } from '@app/common/store/board-content.store';
import { CategoryStore } from '@app/common/store/category.store';

import { GoodsMultiSelectPopupService } from '@app/common/popup/goods-multi-select.popup/index';
import { CategorySelectPopupService } from '@app/common/popup/category-select-popup/index';
import { AppConfigService } from '@app/providers/service/app-config.service';
import * as moment from 'moment';

@Component({
  selector: 'discount-event-update',
  templateUrl: './discount-event-update.page.html',
  styleUrls: ['./discount-event-update.page.css']
})
export class DiscountEventUpdatePage extends BSUpdateFormController  {

  id ;
  private eventbanner;
  private data;
  private goodsItems:Array<any> = [];

  private category = [[]];
  private selectCategory = [[]];

  private targetCategories = [];
  private categoryList = [];

  // private goodsSeqs[];
  public sallerRate = 0;
  public checkOthersSelected = 0;
  public goodsRuleItem = 'all';

  public clientURL: string = this.appConfig.clientURL;

  constructor (
    baseStore: BSBaseStore,
    private boardContentStore: BoardContentStore,
    private categoryStore: CategoryStore,
    private goodsMultiSelectPopupService: GoodsMultiSelectPopupService,
    private categorySelectPopupService: CategorySelectPopupService,
    protected router: Router,
    protected arouter: ActivatedRoute,
    private fileuploader : BSFileUploader,
    alert: BSAlertService,
    public appConfig: AppConfigService,
  ) {

      super(baseStore, router, arouter, alert);

  }

  // ngOnInit() {
  // }

  initController(config: any) {
    
    console.log("DiscountEventUpdatePage::initController command=", config);
    //{{baseUrl}}/common/config/basic

    config.store.command = 'admin/event/event';

    // config.store.id = 'icon';
    // config.title.update = "";
    config.gotoPrevPageAfterSubmit = true;

    this.categoryStore.get().subscribe(resp => {
      this.category[1] = resp.list;
    });


    return config;
  }


  preparedFormControlsConfig() {
    let config = {
      // boardid: ['onlinepromotion'],
      event_type: ['multi'],
      title: [],
      start_date: [],
      end_date: [],
      display: ['n'],
      event_banner: [],
      m_event_banner: [],
      use_coupon: [],
      use_coupon_shipping: [],      
      goods_rule: ['all'],
      //use_code: [],
      //use_code_shipping: [],
      benefits: this.fb.array([this.fb.group({target_sale: [0], event_sale: [], event_point: 0})]),
      category:[],
      saller_rate_type: [0],
      saller_rate_num: [],
      saller_rate: [],
      // goods: this.fb.array([
      //   this.fb.group({
      //       threshold: this.fb.array([
      //       ])
      //   })

    };

    return config;
  }

  getBenefitsFromGroup(idx: number) {
    let formArray = this.bsForm.get('benefits');
    let name: string = idx.toString();
    return formArray.get(name);
 }


  onClickBenefitRadio(evt) {
      console.log(evt);
      this.checkOthersSelected = evt.target.value;
      console.log(this.checkOthersSelected);

      console.log(this.bsForm);
    }

    onClickSelectItem(evt) {
        console.log(evt);
        this.goodsRuleItem = evt.target.value;
    }

    preparedLoadData(resp) {

        console.log("BSUpdateFormController::preparedLoadData resp =", resp);
        this.data = resp;
        this.checkOthersSelected = resp.benefits[0].target_sale;
        this.sallerRate = resp.benefits[0].saller_rate_type;
        
        console.log(this.checkOthersSelected);

        this.bsForm.patchValue({
            saller_rate_type : resp.benefits[0].saller_rate_type,
            saller_rate : resp.benefits[0].saller_rate,

        });

        // this.bsForm.get('benefits[0].target_sale').setValue(resp.target_sale);
        if(resp.goods_rule === 'goods_view') {
            this.goodsRuleItem = 'goods_view';
        }else if(resp.goods_rule === 'category') {
            this.goodsRuleItem = 'category';
        }else {this.goodsRuleItem = 'all'; }

        this.goodsItems = [];
        if(resp.benefits[0].goods) {
            for(let goods of resp.benefits[0].goods) {
                // this.goodsItems = goods;
                if(goods.goods) {
                this.goodsItems.push(goods.goods);
                }
                console.log(this.goodsItems);
            }
        }

        // load categories
        this.categoryList = [];
        if(resp.benefits[0].categories) {
            this.categoryList = resp.benefits[0].categories;
        }

        return resp;
    }


    preparedSaveData(value) {

        console.log("DiscountEventUpdatePage::preparedSaveData value =>", value);
        //console.log(this.goodsItems);
        
        let goodsSeqs = [];

        if (!value.start_date || !value.end_date) {
            this.alert.show('이벤트 기간은 필수값입니다. 기간을 설정해주세요.');
            return false;
        }
        // if(value.start_date < moment().format()) {
        //   this.alert.show('이벤트 시작일은 현재날짜보다 이전일 수 없습니다.');
        //   return false;
        // }
        if(value.start_date > value.end_date) {
            this.alert.show('이벤트 종료일은 이벤트 시작일보다 이전일 수 없습니다.');
            return false;
        }
        if(value.benefits[0].event_sale > 101) {
            this.alert.show("할인율은 100%를 초과할 수 없습니다.");
            return false;
        }
        if(value.saller_rate > 101) {
            this.alert.show("입점사 판매 수수료는 100%를 초과할 수 없습니다.");
            return false;
        }

        for (let goods of this.goodsItems) {
            console.log(goods);
            goodsSeqs.push(goods.goods_seq);
        }
        value.benefits[0].goods = goodsSeqs;

        // seve categories
        let categoryCodes = [];
        for(let category of this.categoryList) {
            //categoryList.push(this.getTargetCategoryCode(category));

            categoryCodes.push(category.category_code);
        }
        value.benefits[0].categories = categoryCodes;

        console.log("DiscountEventUpdatePage::preparedSaveData2 value =>", value);

        
        return value;
    }

    getTargetCategoryCode(category) {

        let targetCategoryCode;
        for(let _category of category) {
            targetCategoryCode = _category.category_code;
        }
        return targetCategoryCode;
    }

    // 상품선택
    onClickGoodsNumber() {

        this.goodsMultiSelectPopupService.popup().subscribe((resp) => {
            if(!resp) return;
            this.pushGoodsItem(resp);
        });
    }

    pushGoodsItem(goodsItems) {
        //this.goodsItems = this.goodsItems.concat(goodsItem);

        let hasSameGoods = false;
        for(let goods of goodsItems) {
            console.log(goods);
            let exist = false;
            for(let _goods of this.goodsItems) {
            if (goods.goods_seq == _goods.goods_seq) {
                exist = true;
                break;
            }
            }

            if (!exist) {
            this.goodsItems.push(goods);
            } else {
            hasSameGoods = true;
            }
        }

        if (hasSameGoods == true) {
            this.alert.show("동일한 상품은 등록할 수 없습니다.");
        }
    }

    onClickDelGoods(item) {
        const index: number = this.goodsItems.indexOf(item);
        console.log(item);
        this.goodsItems.splice(index, 1);
    }


  onClickCategoryBtn() {

    this.categorySelectPopupService.popup().subscribe((data)=>{
      console.log("categorySelectPopupService == " , data);

        //console.log("resp = ", this.bsForm.get('goods_seq'), resp.goodsSeq);

        // if (data) {
        //     this.bsForm.get('goods_seq').setValue(data.goods_seq);
        // }
    });
  }

    //카테고리
    onClickCategory(num, item) {

        console.log("onClickCategory num, item =>", num, item);

        // 첫레벨 왜 2인지는 모르겠음.
        if (num === 2) {
            this.selectCategory = [];
            this.category.splice(3);
            this.category.splice(4);
            this.selectCategory[num - 2] = item;
        } else if (num === 3) {
            this.selectCategory.splice(2);
            this.selectCategory.splice(3);
            this.category.splice(4);
            this.selectCategory[num - 2] = item;
        } else {
            this.selectCategory[num - 2] = item;
        }

        this.loadCategotyList(num, item);
    }

    loadCategotyList(num, item) {
        this.categoryStore.getChildren(item.category_code).subscribe(resp => {
            this.category[num] = resp.list;
            console.log(this.category);
            console.log(this.selectCategory);
        });
    }

    onClickSelectCategory() {
      console.log("selectCategory == ",this.selectCategory);
      this.addCategory(this.selectCategory);
      // this.strCategoryFullName(this.selectCategory);
    }

    addCategory(selectedCategory) {

      // let i = 0;
      // let _title;
      // let item ;

      // let _cate = [];
      // for(let cate of selectedCategory) {
      //   item = {
      //     title: cate.title,
      //     category_code: cate.category_code
      //   }
      //   _cate.push(item);
      //   this._addCategory(_cate);
      // }
      this._addCategory(this.selectCategory);
      // this.strCategoryCode(this.selectCategory);
    }

    strCategoryFullName(category) {

        console.log("strCategoryFullName category =>", category);

        let str = '';
        let i = 0;
        for(let cate of category) {
            console.log(cate);
            str += cate.title;
            if (i < category.length-1) {
                str += ' > ';
            }
            i++;
        }
        return str;
    }


    // strCategoryCode(category) {
    //   let value = [];
    //   for(let cate of category) {
    //     value = cate.category_code;
    //     this.targetCategories = value;
    //   }


    //   return value;
    // }

    _addCategory(_cate) {

        let cate = [];
        cate = _cate.concat(); // value copy

        console.log("_addCategory = ", cate);

        if (this.haveCategoryInCategories(cate, this.categoryList)) {
            this.alert.show("이미 등록된 카테고리 입니다.");
            return;
        }

        let categoryObj: any = {
            category_code: this.getTargetCategoryCode(cate),
            category_name: this.strCategoryFullName(cate)
        };

        this.categoryList.push(categoryObj);
        // this._selectedCategory(this.categoryList);

        console.log("categories == ",this.categoryList);
    }

     haveCategoryInCategories(targetCate, categories) {

      let have = false;
      //target a , a/b, a/b/c

      for(let _cate of categories) {

        console.log("targetCate, _cate = ", targetCate, _cate);

        if (this.sameCategory(targetCate, _cate)) {
          have = true;
          break;
        }
      }

      console.log("haveCategoryInCategories targetCate, categories =", targetCate, categories, have);

      return have;
     }

      //[a, b] : [a]

     sameCategory(cate1, cate2) {

      // a  : abc
      if (cate1.length != cate2.length) {
        return false;
      }

      let same: boolean = true;
      let i = 0;
      for(let cateItem of cate2) {

        if (cateItem.category_code != cate1[i].category_code) {
          same = false;
          console.log("cate1, cate2 ",i, cateItem, cate2,cate1[i], same);
          break;
        }
        i++;
      }

      console.log("sameCategory", same);

      return same;
     }

     onClickRemoveCategory(idx) {
       console.log(idx);
       this.categoryList.splice(idx, 1);
       console.log(this.categoryList);
     }

     onClickSallRate(evt) {
       console.log(evt.target.value);
       this.sallerRate = evt.target.value;
      this.bsForm.patchValue({
        saller_rate_type : evt.target.value
     });
      // this.bsForm.get('saller_rate_type').patchVaue(evt.taget.value);
     }

     goToPageClient() {
       window.open(this.clientURL + "/goods/event/" + this.id);

    }

  }

