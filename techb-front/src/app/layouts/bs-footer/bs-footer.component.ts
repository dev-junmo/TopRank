import { Component, OnInit } from '@angular/core';
import { FooterStore } from './../../store/footer.store';
import { AppService } from '../../common/service/app.service';
//import { BSAuthService } from '../../common/service/bs-auth.service';
import { environment } from '../../../environments/environment';
import { Router} from '@angular/router';


@Component({
  selector: 'bs-footer',
  templateUrl: './bs-footer.component.html',
  styleUrls: ['./bs-footer.component.css']
})
export class BsFooterComponent implements OnInit {


    isHidden = true;
    isHidden2 = true;

    public isProduction = environment.production;
    public version = "";

    private data;
    screenWidth = screen.width;
    screenHeight = screen.height;
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    constructor(
        private router :Router,
        private footerStore: FooterStore,
        private appService: AppService,
        //private auth: BSAuthService,
        ) {

    }

    ngOnInit() {

        if (!this.isProduction) {
            this.version = environment.version;
        }
    }

    load() {
    }

    onClickDesktopVersion() {
        this.appService.trigerViewDesktop();
    }

}
