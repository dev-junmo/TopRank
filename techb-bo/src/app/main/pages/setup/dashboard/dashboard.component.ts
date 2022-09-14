import { Component, OnInit, ViewEncapsulation, TemplateRef } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
//import { BSModalService } from '@bricks/ui/bs-modal/index';

import { BSBaseStore } from '@app/common/store/bs-base.store';

//import { ConfigStore } from '@app/common/store/config.store';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class DashboardComponent extends BSUpdateFormController {

  private isShowTootip: boolean = false;

  constructor (
    baseStore: BSBaseStore,
    protected router: Router,
    arouter: ActivatedRoute,
    alert: BSAlertService,
    public modal: BsModalService) {

      super(baseStore, router, arouter, alert);

  }

  initController(config: any) {
    console.log("initController command=", config);
    config.store.command = 'admin/dashboard';
    // config.store.id = 'dashboard';
    // config.title.update = "";
    return config;
  }

  /////////////////////////////////////////////////////////
  //
  preparedFormControlsConfig() {
    let config = {
      order_period : 7,
    };

    return config;
  }

  //////////////////////////////////////////
  // overide

  preparedLoadData(resp) {
      console.log("BSUpdateFormController::preparedLoadData resp =", resp);

      let data: any = {};

      data.domain = resp.domain.value;
      data.shopName = resp.shopName.value;
      data.company_name = resp.company_name.value;
      data.businessConditions = resp.businessConditions.value;
      data.businessLine = resp.businessLine.value;
      data.business_license = resp.business_license.value;
      data.companyEmail = resp.companyEmail.value;
      data.ceo = resp.ceo.value;
      data.company_phone = resp.company_phone.value;
      data.mailsellingLicense = resp.mailsellingLicense.value;
      data.companyFax = resp.companyFax.value;
      data.companyZipcode = resp.companyZipcode.value;
      data.companyAddress = resp.companyAddress.value;
      data.companyAddressDetail = resp.companyAddressDetail.value;
      data.partnershipEmail = resp.partnershipEmail.value;
      data.member_info_manager = resp.member_info_manager.value;
      data.member_info_part = resp.member_info_part.value;
      data.member_info_rank = resp.member_info_rank.value;
      data.member_info_tel = resp.member_info_tel.value;
      data.member_info_email = resp.member_info_email.value;
      data.mall_terms = resp.mall_terms.value;
      data.copyright = resp.copyright.value;
      data.sales_notice = resp.sales_notice.value;
      data.op_shop_email = resp.op_shop_email.value;
      data.op_day = resp.op_day.value;
      data.op_min_time = resp.op_min_time.value;
      data.op_max_time = resp.op_max_time.value;

      if (resp.business_license.value) {
        console.log("resp.businessLicense.value=", resp.business_license.value);
      }

      // 받을 때

      console.log("data =", data);

      return data;
  }

   //////////////////////////////////////////
  // overide

  preparedSaveData(value) {
      console.log("BSUpdateFormController::preparedLoadData resp =", value);

      return value;
  }



}
