import { Component, OnInit, HostListener, ViewEncapsulation } from '@angular/core';

// import { BSAlertService } from '../../../common/ui/bs-alert/index';
// import { AppService } from '../../common/service/app.service';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
    
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
