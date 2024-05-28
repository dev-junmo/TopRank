import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import { BSAlertService } from '@bricks/common/ui/bs-alert';
import { BSBaseStore } from '@app/common/store/bs-base.store';

import { AdminStore } from '../../../../common/store/admin.store';
import { BOAuthService } from '../../../../providers/service/bo-auth.service';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent extends BSUpdateFormController {

  id;
  public data;
  private isShowTootip: boolean = false;
  //private formAdmin: FormGroup;
  private admin;
  private adminID;
  private loginLog;
  private historyLog;
  public isShowIPAuth: boolean = false;
  private isReadonly : boolean = true;


  constructor(
    baseStore: BSBaseStore,
    private adminStore: AdminStore,
    public auth : BOAuthService,
    private router: Router,
    private route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);
  }

  initController(config: any) {

    console.log("AdminUpdateComponent::initController id, managerSeq =>", this.id, this.auth.managerSeq);
    // id, auth.

    config.store.command = 'admin/manager/manager';
    config.gotoPrevPageAfterSubmit = true;

    return config;
  }

  preparedFormControlsConfig() {
     let config = {



     };

     return config;
  }

  preparedLoadData(resp) {

  }


}
