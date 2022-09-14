import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@app/providers/service/app-config.service';
import { BOAuthService } from '../../../providers/service/bo-auth.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {    

    public authData;
    public boardAuthData;  
    constructor(private appConfig: AppConfigService, public boAuthService: BOAuthService) {
        this.authData = boAuthService.authData;
        this.boardAuthData = boAuthService.boardAuthData;
     
    }

    ngOnInit() {


    }
}
