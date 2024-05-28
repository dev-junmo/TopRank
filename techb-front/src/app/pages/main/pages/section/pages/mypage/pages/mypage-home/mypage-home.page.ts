import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AppService } from '../../../../../../../../common/service/app.service';
import { AuthService } from '../../../../../../../../service/auth.service';
import { PointStore } from '../../../../../../../../store/point.store';
import { BSAlertService } from '../../../../../../../../../common/ui/bs-alert';
import { RewardStore } from '../../../../../../../../store/reward.store';
import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'mypage-home-page',
    templateUrl: './mypage-home.page.html',
    styleUrls: ['./mypage-home.page.css']
})
export class MypageHomePage {
    constructor(
        private router :Router,
        private pointStore: PointStore,
        private rewardStore: RewardStore,
        private formBuilder : FormBuilder,
        private appService: AppService,
        public activateRouter: ActivatedRoute,
        private auth: AuthService,
        private alert: BSAlertService
        ) {
    }  

}
