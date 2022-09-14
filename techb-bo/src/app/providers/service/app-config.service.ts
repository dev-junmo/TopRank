import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Router } from '@angular/router';


@Injectable()
export class AppConfigService {

    static frontURL: string = environment.frontAppURL;

    // todo : static 으로 변경
    public clientURL: string = environment.frontAppURL;
    public apiURL: string = environment.apiURL;
    public isProvider: boolean = false;

    public listQuery = [];

    constructor(protected router: Router) { }

    setConfigProviderMode(url) {

        console.log('AppConfigService::setConfigProviderMode url =>', url);
        if (url.substring(0, 9) == "/provider") {
            this.isProvider = true;
        } else {
            this.isProvider = false;
        }
    }

    setPageQuery(key, dataTableParams, query) {

        console.log('setPageQuery query =>', query);

        this.listQuery[key] = {
            dataTableParams: dataTableParams,
            queryParams: query
        };

        console.log('setPageQuery listQuery[key] =>', this.listQuery);
    }

    getPageQuery(key) {

        console.log('getPageQuery listQuery[key] =>', this.listQuery[key]);
        return this.listQuery[key];
    }

    naviagteSafeProvider(url) {

        console.log('naviagteSafeProvider url, isprovider', url, this.isProvider);

        let _url;
        if(this.isProvider) {
          _url = "/provider/" + url;
        } else {
          _url = url;
        }

        this.router.navigate([_url]);
    }

    // admin/... -> provider/...
    getSafeProviderUrl(url) {

        let _url = url.toLowerCase();
        let urls = _url.split('/');

        if (urls.length == 0) {
            return url;
        }

        console.log('getSafeProviderUrl isProvider, urls =>', this.isProvider, urls);

        if(this.isProvider) {
            if (urls[0] == 'admin') {
                urls[0] = 'provider';
                url = urls.join('/');
            }
            else if (urls[1] == 'admin') {
                urls[1] = 'provider';
                url = urls.join('/');
            }    
        }        
        return url;
    }

    openWindowSafeProvider(url) {
        console.log('naviagteSafeProvider url, isprovider', url, this.isProvider);

        let _url;
        if(this.isProvider) {
            _url = "/provider/" + url;
        } else {
            _url = url;
        }

        window.open(_url, '_blank');
    }

    public isNumeric(data : string) : boolean {
        return !isNaN(Number(data));
    }
}
