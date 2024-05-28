import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';

// datatable -리스트페이지에 필요
import { DataTable, DataTableResource } from '@app/common/data-table';
import { BSDatatableController } from '@app/common/framework/bs-datatable.controller';
import { BSDatatableStore } from '@app/common/store/bs-datatable.store';

import { ProductListStore } from '@app/common/store/product-list.store';
import * as moment from 'moment';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.css']
})
export class ProductListPage extends BSDatatableController {

    @ViewChild(DataTable) dataTable: DataTable;

    constructor(
        public productStore: ProductListStore,
        protected router: Router,
        public alert: BSAlertService,
        activateRouter: ActivatedRoute,
        private modal: BSModalService,
        ) {
        super(productStore, router, activateRouter, alert);

    }

    preparedLoadData(items) {
      // 잔여일, 7일 -> 7
      for(let item of items) {
          item.product_period = parseInt(item.product_period);
          item.remainingDays = this._getRemainingDays(item);
          item.productMidText = `${item.product_mid.substr(0,5)}\n${item.product_mid.substr(5,6)}`;
      }

      //product_mid
      console.log('preparedLoadData items =>', items);
      return items;
    }

    _getRemainingDays(item) {
        if (!item.end_date) { return; }
        return moment(item.end_date).diff(moment(), "days");
    }


    // _getRemainingDays(item) {
    //     let remainingDays = 0;
    //     let now = moment();
    //     if (!item.end_date) { return; }
    //     let end = moment(item.end_date);
    //     let d = moment.duration(end.diff(now));
    //     remainingDays = Math.floor(d.asDays());
    //     return remainingDays;
    // }

    onChangeEnabled(checked, item) {
      let msg = `사용 여부를 변경하시겠습니까?`;

      this.alert.confirm(msg).subscribe(() => {
        this.productStore.setEnabled(item.product_seq, checked).subscribe(resp => {
          this.alert.show('처리가 완료되었습니다.').subscribe(resp => {
              //this.relodadList();
          });
        });
      });

    }

    // 자동 연장 여부
    onChangeAutoExtension(checked, item) {
      let msg = `자동 연장 여부를 변경하시겠습니까?`;
      
      this.alert.confirm(msg).subscribe(() => {
        this.productStore.setIsAutoExtension(item.product_seq, checked).subscribe(resp => {
          console.log("productStore resp => ", resp);
          this.alert.show('처리가 완료되었습니다.').subscribe(resp => {
            //this.reloadList();
          });
        });
      });
    }

    onChangeAutoExtensionPriority(checked, item) {
      let msg = `자동 연장 우선 여부를 변경하시겠습니까?`;

      this.alert.confirm(msg).subscribe(() => {
        this.productStore.setIsAutoExtensionPriority(item.product_seq, checked).subscribe(resp => {
          this.alert.show('처리가 완료되었습니다.').subscribe(resp => {
            //this.reloadlist();
          })
        })
      });
    }

    // 승인
    onClickConfirm(item) {
        if (!item) { return; }
        let msg = `해당 상품을 승인하시겠습니까?`;
        this.alert.confirm(msg).subscribe((result) => {
            this.productStore.confirm(item.product_seq).subscribe(resp => {
                console.log('ProductListPage.confirm resp =>', resp);
                this.alert.show('승인처리가 완료되었습니다.').subscribe(() => {
                    this.reloadList();
                });
            });
        });   
    }

    // 취소
    onClickCancel(item) {
        if (!item) { return; }
        let msg = `해당 상품을 취소하시겠습니까?`;
        this.alert.confirm(msg).subscribe((result) => {
            this.productStore.cancel(item.product_seq).subscribe(resp => {
                console.log('ProductListPage.cancel resp =>', resp);
                this.alert.show('취소처리가 완료되었습니다.').subscribe(() => {
                    this.reloadList();
                });
            });
        });   
    }

  //   onClickComplete(item) {
  //     if (!item) { return; }
  //     let msg = `입금확인 처리하고 ${item.member_seq}번 고객님께 유료포인트 ${item.charge_point}와 무료포인트 ${item.charge_free_point}를 지급하시겠습니까?`;
  //     this.alert.confirm(msg).subscribe((result) => {
  //         this.pointChargeStore.complete(item.point_charge_seq, item.member_seq, item.charge_point, item.charge_free_point).subscribe(resp => {
  //             console.log('pointChargeStore.complete resp =>', resp);
  //             this.alert.show('처리가 완료되었습니다.').subscribe(() => {
  //                 this.reloadList();
  //             });
  //         });
  //     });   
  // }
    
  }
