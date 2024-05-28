import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, NgControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { User } from '../../../../providers/model/model.user';
// import { User } from '../../../../account/providers/model/model.user';
import { BOAuthService } from '../../../providers/service/bo-auth.service';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BOModalDialogService } from '@app/common/popup/bo-modal-dialog/index';

import * as moment from 'moment';

@Component({
  selector: 'no-auth',
  templateUrl: './noauth.component.html',
  styleUrls: ['./noauth.component.css']
})
export class NoAuthComponent  {
    constructor() {

    }   
}
