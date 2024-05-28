import { EventStore } from '@app/common/store/event.store';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSBaseStore } from '@app/common/store/bs-base.store';
import { KakaoStore } from '@app/common/store/kakao.store';

@Component({
  selector: 'kakao-config-update',
  templateUrl: './kakao-config-update.page.html',
  styleUrls: ['./kakao-config-update.page.css']
})
export class KakaoConfigUpdatePage extends BSUpdateFormController {

    id ;

    private data = [];
    private kko;
    constructor (
      baseStore: BSBaseStore,
      private kakaoStore : KakaoStore,
      protected router: Router,
      protected arouter: ActivatedRoute,
      alert: BSAlertService,
    ) {
        super(baseStore, router, arouter, alert);
    }

    // ngOnInit() {
    // }
    initController(config: any) {
      // this.loadKakaoItems();

        console.log("BSUpdateFormController::initController command=", config);
        //{{baseUrl}}/common/config/basic

        config.store.command = 'admin/common';
        config.store.id = 'kko';

        //this.isUpdateMode = true;

        return config;
      }



    preparedFormControlsConfig() {
      let config = {
        config_kko: this.fb.array([
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' }),
           this.fb.group({ kko_seq: '', kko_code: '', kko_desc: '', callback: '', user_yn: '', admin_yn: '', provider_yn:'', kko_msg: '', kko_msg_admin: '' })
        ])
      };

      return config;
    }


    get kakaoFormArray(): FormArray {
      return this.bsForm.get('config_kko') as FormArray;
    }

    kakaoFromGroup(idx: string) {
      let formArray = this.bsForm.get('config_kko');
      let name: string = idx.toString();
      return formArray.get(name);
    }


    preparedLoadData(resp) {
        console.log("BSUpdateFormController::preparedLoadData resp =", resp);
        let data = { config_kko: resp.list };
        return data;

      // this.kakaoStore.getKakaoTemplate().subscribe((data => {
      //     // this.data = resp.list;

      //     // this.bsForm.setControl('config_kko', this.fb.array(resp.list || []));
      //     this.kakaoFormArray.controls = resp.list;
      //     // console.log(this.kakaoFormArray.controls);
      //     // this.bsForm.setValue({config_kko : resp.list});
      // }));

        //return resp;
    }

    preparedSaveData(value) {
        console.log("BSUpdateFormController::preparedLoadData resp =", value);
        return value;
    }

  }
