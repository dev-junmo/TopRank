import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

// import { BSAlertService } from '../../../common/ui/bs-alert/index';
// import { AppService } from '../../common/service/app.service';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
    

    constructor(
        // protected alert: BSAlertService,
        // public appService: AppService,
        ) {

        //this.device = this.appService.getDevice();
        //console.log("moooobileeeee!!!!!!!!!!!!!!!! == ",this.device);
    }

    ngOnInit() {
        console.log('MainComponent::ngOnInit');
        
    }

    
}
