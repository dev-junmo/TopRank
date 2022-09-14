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
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class BasicComponent extends BSUpdateFormController {

  private isShowTootip: boolean = false;

  constructor (
    baseStore: BSBaseStore,
    protected router: Router,
    arouter: ActivatedRoute,
    alert: BSAlertService,
    public modal: BsModalService) {

      super(baseStore, router, arouter, alert);

  }

  //////////////////////////////////////////
  // overide
   onChangeAddress(data){
    // 여기로 주소값이 반환
    console.log(this.bsForm);
    let zip = this.bsForm.get("companyZipcode");
    zip.setValue(data.zip);
    let addr = this.bsForm.get("companyAddress");
    addr.setValue(data.addr);
    //data.addr;
    console.log(data);
  }

  daumAddressOptions =  {
    class: ['btn','white-s-btn']
  };

  ///////////////////////////////////////////////////////
  // overide
  // 별도의 스토어를 안만들어도 되는 경우
  // 1. 그냥 basestore를 넣어준다. 그런데 basestore에서 command를 정의할 수 없으니
  // 2. initController를 override해서 command를 꼭 정의해주어야 한다.

  // initController(command: string) {

  //   command = 'common/config';
  //   console.log("BasicComponent::initController command=", command);
  //   return command;
  // }

  ///////////////////////////////////////////////////////
  // overide
  // 별도의 스토어를 안만들어도 되는 경우
  // 1. 그냥 basestore를 넣어준다. 그런데 basestore에서 command를 정의할 수 없으니
  // 2. initController를 override해서 command를 꼭 정의해주어야 한다.
  //
  // * config
  //  let config: any = {
  //   store: {
  //       command: this.baseStore.command,
  //       id: this.baseStore.id
  //   },
  //   title: {
  //      creat: '',
  //      update: ''
  //   }
  // };

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);
    //{{baseUrl}}/common/config/basic

    config.store.command = 'admin/common/config';
    config.store.id = 'basic';
    config.title.update = "";


    return config;
  }

  /////////////////////////////////////////////////////////
  //
  preparedFormControlsConfig() {
    let config = {
      // 기본정보
      domain: [],
      shopName: [],
      // 사업자정보
      company_name: [],
      businessConditions: [],
      business_license: [],
      businessLine: [],
      companyEmail: [],
      ceo: [],
      companyZipcode:[],
      company_phone: [],
      mailsellingLicense : [],
      companyFax: [],
      companyAddress: [],
      companyAddressDetail: [],
      partnershipEmail: [],
      // 개인정보 보호책임자 정보
      member_info_manager: [],
      member_info_part: [],
      member_info_rank: [],
      member_info_tel: [],
      member_info_email: [],
      mall_terms: [],
      copyright :[],
      sales_notice :[],
      op_shop_email :[],
      op_day :[],
      op_min_time :[],
      op_max_time :[],
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
