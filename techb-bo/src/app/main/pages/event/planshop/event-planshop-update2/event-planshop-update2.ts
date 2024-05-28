import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { BOAuthService } from '../../../../../providers/service/bo-auth.service';
import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
import { BoardContentStore } from '@app/common/store/board-content.store';
import * as moment from 'moment';


@Component({
  selector: 'event-planshop-update2',
  templateUrl: './event-planshop-update2.html',
  styleUrls: ['./event-planshop-update2.css']
})
export class EventPlanShopUpdate2Page extends BSUpdateFormController {

    id ;
    private banner;
    private thumbnail;
    public selectedGoods = [];
    public goodGroups = [];

    // extend_planshop: [ {
    //     category_name: '앵커명1',
    //     goods_seq: [ 11122, 22233, 33344 ]
    //     goods : [{goods_name, goods_seq}]     
    //     }, {
    //     category_name: '앵커명2',
    //     goods_seq: [ 11122, 22233, 33344 ]
    //     }
    // ]

    private data;
    constructor (
        baseStore: BSBaseStore,
        private boardContentStore: BoardContentStore,
        public auth: BOAuthService,
        protected router: Router,
        protected arouter: ActivatedRoute,
        private fileuploader: BSFileUploader,
        alert: BSAlertService) {
        super(baseStore, router, arouter, alert);
    }

    initController(config: any) {
        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/board/boarddata';
        config.store.params = {boardid: 'planshop'};

        // config.store.id = 'icon';
        // config.title.update = "";
        config.gotoPrevPageAfterSubmit = true;

        return config;
    }

    preparedFormControlsConfig() {
        let config = {
            boardid: ['planshop'],
            subject: [],
            contents: [''],
            notice: ['0'],
            hidden: [0],

            thumbnail_url: [],
            mobile_thumbnail: [],
        
            banner_url: [],
            mobile_banner: [],
            
            goods: [],
            cmt_position: 'none',
            cmt_per_page: 10,
            mobile_image_arr: this.fb.array([]),  // data용
            _mobile_image_arr: this.fb.array([
                this.fb.group({ image: '' }),
                this.fb.group({ image: '' }),
                this.fb.group({ image: '' }),
                this.fb.group({ image: '' }),
                this.fb.group({ image: '' })]),
            hidden_cmt_use: 'unuse'

        };

        return config;
    }

    preparedLoadData(resp) {
        
        this.data = resp;
        this.thumbnail = resp.thumbnail_url;
        this.banner = resp.banner_url;

        if (resp.extend_planshop) {
            // let i = 1;
            // for(let item of resp.extend_planshop) {
            //     item.cate_positon = i;
            // }
            this.goodGroups = resp.extend_planshop;
        } else {
            this.goodGroups = [];
        }

        console.log('preparedLoadData goodsGroups =>', this.goodGroups);

        // 이전에 앵커 없는 기획전
        if (resp.goods) {
            this.selectedGoods = resp.goods;
            // for(let goods of resp.goods) {
            //     this.selectedGoods.push({goods_seq: goods, goods_name: ''});    
            // }
        } else {
            this.selectedGoods = [];
        }

        // load mobile_image_arr
        let i = 0;
        if (resp.mobile_image_arr && resp.mobile_image_arr.length > 0) {
            for(let image of resp.mobile_image_arr) {
                let group = this.imageGroupFromFormArrayMobile(i++);
                group.setValue({ image: image });
            }
        }
        
        console.log("EventPlanShopUpdate2Page::preparedLoadData resp =>", resp, this.selectedGoods);
        return resp;
    }

    preparedSaveData(value) {

        value.skin = 'planshop';

        // if (!this.selectedGoods || this.selectedGoods.length == 0) {
        //     this.alert.show('기획전에 노출할 상품을 1개이상 선택해주세요.');
        //     return false;
        // } 

        value.goods_seq = [];
        for(let goods of this.selectedGoods) {
            if (goods) {
                value.goods_seq.push(goods.goods_seq);
            }            
        }

        console.log('preparedSaveData goodGroups =>', this.goodGroups);

        let idx = 0;
        for(let group of this.goodGroups) {
            group.goods_seq = [];
            group.cate_positon = idx;
            for(let goods of group.goods) {
                if (goods) {
                    group.goods_seq.push(goods.goods_seq);
                }
            }
            //delete group.goods;
        }

        value.extend_planshop = this.goodGroups;

        console.log('preparedSaveData value =>', value);
        
        if(value.m_date > value.d_date) {
            this.alert.show('기획전 기간을 확인해주세요.');
            return false;
        }
 
        // if (!value.link_url && !(value.contents && value.mobile_contents)) {
        //     this.alert.show('연결URL을 입력하거나 PC, 모바일 컨텐츠를 입력해주세요.');
        //     return false;
        // }

        console.log("EventPlanShopUpdate2Page::preparedLoadData value =>", value);
        
        // this.bsForm.patchValue({
        //     boardid: 'planshop',
        //     notice: '0',
        //     hidden: '0',
        //     contents: '기획전 배너'
        // });

        if(!this.id) {
            // if(value.m_date < moment().format()) {
            //   this.alert.show('기획전 기간을 확인해주세요.');
            //   return false;
            // }
            value.name = this.auth.managerName;
        }

        // save mobile_image_arr
        value.mobile_image_arr = [];
        let i = 0;
        for(let item of this.getImageFormGroupArrayMobile()) {
            let group = this.imageGroupFromFormArrayMobile(i++);
            console.log('preparedSaveData group =>', group);
            if (group.value.image) {
                value.mobile_image_arr.push(group.value.image);
            }            
        }

        console.log('preparedSaveData2 value =>', value);

        return value;
    }

    onClickAddGroup() {

        if(this.goodGroups && this.goodGroups.length >= 14) {
            this.alert.show('그룹은 12개까지만 추가가 가능합니다.');
            return;
        }

        let goods = {
            category_name: '',
            goods: [],
            goods_seq: []
        };

        this.goodGroups.push(goods);
    }

    onClickDeleteGroupBtn(index) {

        this.alert.confirm("해당 그룹을 삭제 하시겠습니까?").subscribe((result) => {
            this.goodGroups.splice(index, 1);    
        });
    }

    getImageFormGroupArrayMobile() {
        let ar: FormArray = this.bsForm.get('_mobile_image_arr') as FormArray;       
        return ar.controls;
    }
   
    imageGroupFromFormArrayMobile(idx) {
        let formArray = this.bsForm.get('_mobile_image_arr');
        let i: string = idx.toString();
        return formArray.get(i);
    }


   

// onSubmit() {
//   let data = this.preparedSaveData(this.bsForm.value);
//   if (data == false) return;

//   if(this.isUpdateMode == true) {
//       console.log(this.bsForm.value);
//         this.boardContentStore.update(this.id , data).subscribe( resp => {
//             this.alert.show("수정 되었습니다.");
//             this.router.navigate(['/main/event/planshop/list'],{ relativeTo:this.activatedRouter });
//         });
//   } else {
//     this.boardContentStore.regist(data).subscribe( resp => {
//       this.alert.show("등록되었습니다.");
//       this.router.navigate(['/main/event/planshop/list'],{ relativeTo:this.activatedRouter });
//     });
//   }
// }

//   onThumbnailUpload($event) {
//     console.log("fileupload event", $event);
//     // let seq:boolean = true;
//     this.fileuploader.fileUpload($event).subscribe((resp=>{
//       console.log('fileuploader resp=', resp);
//       this.thumbnail = resp.url;
//       this.bsForm.patchValue({
//         thumbnail_url : resp.url
//      });
//     }));
//   }

//   onBannerUpload($event) {
//     console.log("fileupload event", $event);
//     // let seq:boolean = true;
//     this.fileuploader.fileUpload($event).subscribe((resp=>{
//       console.log('fileuploader resp=', resp);
//       this.banner = resp.url;
//       this.bsForm.patchValue({
//         banner_url : resp.url
//      });
//     }));
//   }

    // 사람         CLASS

    onClickUpPositionBtn(goods, idx) {
        console.log('onClickUpPositionBtn goodGroups, goods, idx =>', this.goodGroups, goods, idx);
        if (idx < 1) {
            return;
        }

        let temp = this.goodGroups[idx-1];
        this.goodGroups[idx-1] = this.goodGroups[idx];
        this.goodGroups[idx] = temp;

        console.log('onClickUpPositionBtn goodGroups =>', this.goodGroups);
    }

    onClickDownPositionBtn(goods, idx) {
        console.log('onClickUpPositionBtn goodGroups, goods, idx =>', this.goodGroups, goods, idx);
        if (idx >= this.goodGroups.length-1) {
            return;
        }

        let temp = this.goodGroups[idx+1];
        this.goodGroups[idx+1] = this.goodGroups[idx];
        this.goodGroups[idx] = temp;

        console.log('onClickUpPositionBtn goodGroups =>', this.goodGroups);
    }



}
