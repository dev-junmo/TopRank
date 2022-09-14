import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// alert, modal
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';



@Component({
  selector: 'guide-page',
  templateUrl: './guide.page.html',
  styleUrls: ['./guide.page.css']
})
export class GuidePageComponent  implements OnInit {

    type;

    constructor(
        alert: BSAlertService,
        private modal: BSModalService,
        // protected router: Router,
        private activateRouter: ActivatedRoute
        ) {
    }

    ngOnInit() {
      this.activateRouter.queryParams.subscribe(params => {
        console.log(params);
        this.type = params['type'];
        // const userId = params['userId'];
        // console.log(userId);
      });
    }
}
