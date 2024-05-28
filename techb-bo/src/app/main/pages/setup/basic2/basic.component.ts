import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
//import { BSModalService } from '@bricks/ui/bs-modal/index';

import { BSBaseStore } from '@app/common/store/bs-base.store';

//import { ConfigStore } from '@app/common/store/config.store';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AdminStore } from '@app/common/store/admin.store';
//import { Howl } from 'howler'

var context;
window.onload = function() {
  context = new AudioContext();
  
}

// One-liner to resume playback when user interacted with the page.

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class BasicComponent2 extends BSUpdateFormController {

  @ViewChild('playBtn') playBtnRef: ElementRef;
  @ViewChild('audioBeep') audioBeepPlayerRef: ElementRef;
  @ViewChild('audioPang') audioPangPlayerRef: ElementRef;
  @ViewChild('audioZero') audioZeroPlayerRef: ElementRef;

  private isShowTootip: boolean = false;

  maxListeners =  6;
  constructor (
    baseStore: BSBaseStore,
    protected router: Router,
    arouter: ActivatedRoute,
    alert: BSAlertService,
    public adminStore: AdminStore,
    public modal: BsModalService) {

      super(baseStore, router, arouter, alert);   
      

      
  }

  onClickBtn() {
    context.resume().then(() => {
      console.log('Playback resumed successfully');
    });
    this.test();
    setInterval(() => {
      this.test();
    }, 5 * 60 * 1000);
  }

  test() {
      //document.getElementById('audioBeep').play();
      //this.audioPangPlayerRef.nativeElement.play();
           
      let listeners = 0;
      let channels = ['sound', 'baby', 'melody', 'classic'];
      for(let channel of channels) {
        this.adminStore.getChannelStatus(channel).subscribe(resp => {
          console.log("test =>", resp.listeners);
          listeners+= resp.listeners;
        });
      }

      setTimeout(() => {
          console.log('total =>', listeners);
          if (this.maxListeners < listeners) {
              this.maxListeners = listeners;
              this.audioPangPlayerRef.nativeElement.play();
              return;
          }

          if (listeners == 0) {
              let promise = this.audioZeroPlayerRef.nativeElement.play();
              return;
              // if (promise !== undefined) { 
              //   promise.then( () => { 
              //     // Autoplay started! 
              //   }).catch(error => { 
              //     // Autoplay was prevented. // Show a "Play" button so that user can start playback. 
              //   }); 
              // }
          }

          for(let i = 0; i < listeners; i++) {
              setTimeout(() => { 
                this.audioBeepPlayerRef.nativeElement.play().then(() => {
                  
                });
              }, 1000*(i+1));
          }
      }, 5000);
  }

  playAudio(fileName){
      let audio = new Audio();
      audio.src = fileName; 
      audio.load();
      audio.play();
  }

  initController(config: any) {

   
    // console.log("BSUpdateFormController::initController command=", config);
    // //{{baseUrl}}/common/config/basic

    // config.store.command = 'admin/common/config';
    // config.store.id = 'basic';
    // config.title.update = "";


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
