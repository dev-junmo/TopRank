import { Component,ViewChild, OnInit } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';

@Component({
  selector: 'bs-header',
  templateUrl: './bs-header.component.html',
  styleUrls: ['./bs-header.component.css']
})
export class BSHeaderComponent implements OnInit {

    private isLogin: boolean = false;
    private managerName;

    public mainURL = '/main/home';

    constructor(
        private appConfig: AppConfigService) {

    }

    ngOnInit() {
        if (this.appConfig.isProvider) {
            this.mainURL = '/provider/main/home';
        }
    }

}
