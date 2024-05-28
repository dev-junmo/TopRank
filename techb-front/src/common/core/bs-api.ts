import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import {Observable}              from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams } from "@angular/http";
//import { Location } from '@angular/common';

import 'rxjs/add/observable/throw';
// import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';

import { BSLoadingService } from './bs-loading';
import { BSAlertService } from '../ui/bs-alert';

import { environment } from '../../environments/environment';

export interface BSBaseUrl {
    baseUrl?: any;
    enabled?: boolean;
    type?: any;
}

export class FormQueryEncoder {
    encodeKey(k: string): string { return encodeURIComponent(k); }
    encodeValue(v: string): string { return encodeURIComponent(v); }
}


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class BSApi {

    static url: string = environment.apiURL;
    static cachableUrl: string = environment.cachableApiURL;

    private defaultRequestOption: any = { withCredentials: true };

    constructor(public _http: Http,
        private loading: BSLoadingService,
        //private location: Location,
        private alert: BSAlertService) {

    }

    private _errorHandler(err: any, ignoreErrorAlert: boolean = false) {

        this.loading.end();

        setTimeout(()=> {
            this.loading.end();
        }, 1000);
        setTimeout(()=> {
            this.loading.end();
        }, 2000);

        let _err = err; //err.json();

        // 네트워크 미연결
        if (!_err || !_err.code) {
            console.log('_errorHandler', _err);
            return Observable.throw(_err);
        }

        if (ignoreErrorAlert === true) {
            return Observable.throw(_err);
        }

        console.log("_errorHandler _err =>", _err);     
        _err.message = _err.message.toString().replace('\n', '<br/>');

        // _todo : 프로덕트모드에서만 alert 패스하는것으로 수정필요
        // if (_err.error.code == 500) {

        // } else {
            if (this.alert) {
                this.alert.show(_err.message, '알림').subscribe(() => {


                    // if (_err.error.status == 403 || _err.error.status == 404) {
                    //     this.location.back();
                    // }
                });
                //this.alert.show(_err.message + ' <br>CODE = '  + _err.code, '알림');
            } else {
                alert(_err.message + ' CODE = '  + _err.code);
            }
        //}

        return Observable.throw(_err);

        // //this.loading.end();

        // console.log('bsapi::_errorHandler sever error:', err);  // debug
        // if(err instanceof Response) {
        //   return Observable.throw(err.json().error || 'backend server error');
        //   // if you're using lite-server, use the following line
        //   // instead of the line above:
        //   //return Observable.throw(err.text() || 'backend server error');
        // }
        // return Observable.throw(err || 'backend server error');
    }

    _respProcess(res) {
        this.loading.end('api:done');
        let _res = res.json();
        if(_res.error) {
            throw _res;
        }
        return _res;
    }

    // todo : 로딩바 api 오류일때 숨기기 // 위치를 잡을 수 있어
    get(endpoint: string, params?: any, options?: RequestOptions, 
            ignoreErrorAlert: boolean = false, cachable: boolean = false) {
        // todo: 임시로 세션을 로딩에서 제외함, 이것때문에 로딩회수가 꼬여서 카트에 로딩이 안나옴
        // if (endpoint != "session")
                this.loading.start(endpoint);

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        // Support easy query params for GET requests
        if (params) {
            const p = new URLSearchParams('', new FormQueryEncoder());
            for (const key in params) {
                p.set(key, params[key]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }

        let url = (cachable ? BSApi.cachableUrl : BSApi.url) + '/' + endpoint;
        console.log("BSApi:get options, url =>", options, url);
        url = encodeURI(url);
        console.log("BSApi:get url =>", url);

        return this._http.get(url, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::get cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    post(endpoint: string, body: any, options?: RequestOptions) {
        this.loading.start();

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        return this._http.post(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::post cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err); });
    }

    // 파일 업로드 할 때 사용함
    postWithForm(endpoint: string, bodyObject: any, ignoreErrorAlert: boolean = false) {
        this.loading.start();

        // make body
        let body:URLSearchParams = new URLSearchParams();
        Object.keys(bodyObject).map(key => {
           body.append(key, bodyObject[key]); 
        });

        // header
        let headers = new Headers();
        console.log(headers);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('enctype', 'multipart/form-data');  
        headers.append('Accept', 'application/json');

        // option
        let options = new RequestOptions({ withCredentials: true, headers: headers });
        console.log('api postWithForm endpoint, bodyObject =>', endpoint, bodyObject);
        return this._http.post(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::postWithForm cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    put(endpoint: string, body: any, options?: RequestOptions, ignoreErrorAlert: boolean = false, 
        ignoreProgress: boolean = false) {

        if (!ignoreProgress) {
            this.loading.start();
        }
        
        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        console.log('put ', BSApi.url + '/' + endpoint, body);

        return this._http.put(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::put cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    delete(endpoint: string, params?: any, options?: RequestOptions, ignoreErrorAlert: boolean = false) {

        this.loading.start();

        if (params && !options) {
                options = new RequestOptions({
                withCredentials: true,
                body: params
                });
        } else if (!options) {
                options = new RequestOptions({
                withCredentials: true,
                });
        }

        return this._http.delete(BSApi.url + '/' + endpoint, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::delete cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    patch(endpoint: string, body: any, options?: RequestOptions) {

        this.loading.start();

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        return this._http.put(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::patch cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err); });
    }

}

// import {Injectable}              from 'angular2/core';
// import {Http, Response, Request} from 'angular2/http';
// import {Observable}              from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
// //import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/do';  // debug
// import 'rxjs/add/operator/catch';

// @Injectable()
// export class MyService {
//     constructor(private _http:Http) {}
//     private _serverError(err: any) {
//         console.log('sever error:', err);  // debug
//         if(err instanceof Response) {
//           return Observable.throw(err.json().error || 'backend server error');
//           // if you're using lite-server, use the following line
//           // instead of the line above:
//           //return Observable.throw(err.text() || 'backend server error');
//         }
//         return Observable.throw(err || 'backend server error');
//     }
//     private _request = new Request({
//         method: "GET",
//         // change url to "./data/data.junk" to generate an error
//         url: "./data/data.json"
//     });
//     // public API
//     public getData() {
//         return this._http.request(this._request)
//           // modify file data.json to contain invalid JSON to have .json() raise an error
//           .map(res => res.json())  // could raise an error if invalid JSON
//           .do(data => console.log('server data:', data))  // debug
//           .catch(this._serverError);
//     }
// }
