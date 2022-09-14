import 'rxjs/add/operator/map';
import {Observable}              from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams } from "@angular/http";
import { Location } from '@angular/common';


import 'rxjs/add/observable/throw';
// import 'rxjs/Rx';  // use this line if you want to be lazy, otherwise:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';

import { BSLoadingService } from './bs-loading';
import { BSAlertService } from '../ui/bs-alert';

import { FieldTransPipe } from '../pipe/field.trans.pipe';

import { environment } from '@src/environments/environment';
import { Router } from '@angular/router';

export interface BSBaseUrl {
    baseUrl?: any;
    enabled?: boolean;
    type?: any;
}

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class BSApi {

    static url: string = environment.apiURL;
    private defaultRequestOption: any = { withCredentials: true};
    private transField = {
        clip_url: '클립링크',
        program_name: '프로그램명'
    };

    constructor(public _http: Http,
        private loading: BSLoadingService,
        private fieldTrans : FieldTransPipe,        
        private router : Router,
        private alert: BSAlertService) {

    }

    ////////////////////////////////////
    // replace first command

    static sourceCommand;
    static targetCommand;

    static setReplaceFirstCommand(sourceCommand, targetCommand) {
        BSApi.sourceCommand = sourceCommand;
        BSApi.targetCommand = targetCommand;
    }

    static resetReplaceFirstCommand() {
        BSApi.sourceCommand = null;
        BSApi.targetCommand = null;
    }

    // static getQueryParams(objecgt) {

    //     const p = new URLSearchParams();
    //     if (params) {
    //         for (const key in params) {
    //             p.set(key, params[key]);
    //         }
    //     }
    //     console.log('getQueryParams params =>', p.toString());
    //     return p.toString();
    // }

    private replaceFirstCommand(command) {

        console.log("replaceFirstCommand command =>", command, BSApi.sourceCommand, BSApi.targetCommand);

        if (!BSApi.sourceCommand || !BSApi.targetCommand) {
            return command;
        }

        let _command = command.toLowerCase();
        let commands = _command.split('/');

        if (commands[0].length == 0) { return command; }
        if (commands[0] == BSApi.sourceCommand) {
            commands[0] = BSApi.targetCommand;
            command = commands.join('/');
        }

        console.log("replaceFirstCommand2 command =>", command, commands);

        return command;
    }

    ////////////////////////////////////
    // error handler
    private _errorHandler(err: any, ignoreErrorAlert: boolean = false) {

        console.log('err, ignoreErrorAlert =>', err, ignoreErrorAlert);

        this.loading.end('api:_errorHandler1');

        // todo : 이 부분 왜 했는지 파악하고 처리
        setTimeout(()=> {
            this.loading.end('api:_errorHandler2');
        }, 1000);

        setTimeout(()=> {
            this.loading.end('api:_errorHandler3');
        }, 2000);

        let _err = err;//err.json();

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

        if (this.alert) {
            this.alert.show(this.fieldTrans.transform(_err.message), '알림').subscribe(() => {

                // if (_err.error.status == 403 || _err.error.status == 404) {
                //     this.location.back();
                // }

                //api 권한 없음
                // if (_err.code == 1403) {
                //     window.location.href =  'http://localhost:4201/login/noauth';
                // }
            
                if (_err.code == 1401) {      
                    window.location.href = this._getSafeProviderUrl(window.location.href, 
                        '/login?redirecturl=' + this.router.url);
                }
            });
            //this.alert.show(_err.message + ' <br>CODE = '  + _err.code, '알림');
        } else {
            alert(this.fieldTrans.transform(_err.message) + ' CODE = '  + _err.code);
        }
    
        return Observable.throw(_err);

        // console.log('bsapi::_errorHandler sever error:', err);  // debug
        // if(err instanceof Response) {
        //   return Observable.throw(err.json().error || 'backend server error');
        //   // if you're using lite-server, use the following line
        //   // instead of the line above:
        //   //return Observable.throw(err.text() || 'backend server error');
        // }
        // return Observable.throw(err || 'backend server error');
    }

    _errorParser(errs) {
        let _errors;

        if(errs.length > 0 ) {
            // errs.toString();
            // for( let _err of errs) {
            //     _err.toString();
            errs = errs.join(',');
            // }
        }

        console.log("err = ", errs , _errors);
        for(let field in this.transField) {

            let keyword = "{{" + field + "}}";
            errs = errs.replace(keyword, this.transField[field]);

            console.log('error message', errs , keyword, this.transField[field]);
        }

        return errs;
    }

    _isProvider(url) {

        let urls = url.split('/');

        if (urls.length < 2) {
            return false;
        } 

        if (urls[3] == "provider") {
            return true;
        }

        return false;
    }

    _getSafeProviderUrl(currUrl, targertUrl) {

        console.log('getSafeProviderUrl currUrl, targertUrl =>', currUrl, targertUrl);

        let _url = targertUrl.toLowerCase();
        let urls = _url.split('/');

        if (urls.length == 0) {
            return targertUrl;
        }

        console.log('getSafeProviderUrl2 isProvider, urls =>', this._isProvider(currUrl), urls);

        if(this._isProvider(currUrl)) {
            targertUrl = '/provider' + targertUrl;
            // if (urls[0] == 'admin') {
            //     urls[0] = 'provider';
            //     targertUrl = urls.join('/');
            // }
            // else if (urls[1] == 'admin') {
            //     urls[1] = 'provider';
            //     targertUrl = urls.join('/');
            // }    
        }        
        return targertUrl;
    }

    _respProcess(res) {
        this.loading.end('api:done');
        let _res = res.json();
        if(_res.error) {
            throw _res;
        }
        return _res;
    }

    _addPageNameParam(params) {
        // if (!this.router.url || this.router.url == '/') {
        //     return params;
        // }
        // if (!params) {
        //     params = {};
        // }
        // params['_MENU_NAME'] = this.router.url;
        return params;
    }

    // todo : 로딩바 api 오류일때 숨기기 // 위치를 잡을 수 있어
    get(endpoint: string, params?: any, options?: RequestOptions, ignoreErrorAlert?: boolean) {
        // todo: 임시로 세션을 로딩에서 제외함, 이것때문에 로딩회수가 꼬여서 카트에 로딩이 안나옴
        //if (endpoint != "session") {
            this.loading.start('get '+ endpoint);
        //}

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);

        }

        // 보안 요청 : 페이지 네임 전달
        params = this._addPageNameParam(params);

        // Support easy query params for GET requests
        if (params) {
            const p = new URLSearchParams();
            for (const key in params) {
                p.set(key, params[key]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }

        console.log("options.search = ", options, options.search, options.url, this.router.url, params);

        endpoint = this.replaceFirstCommand(endpoint);

        let url = BSApi.url + '/' + endpoint;
        url = encodeURI(url);
       
        return this._http.get(url, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::get cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    post(endpoint: string, body: any, options?: RequestOptions, ignoreErrorAlert?: boolean) {
        this.loading.start('post '+ endpoint);

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        // 보안 요청 : 페이지 네임 전달
        body = this._addPageNameParam(body);

        endpoint = this.replaceFirstCommand(endpoint);
        
        return this._http.post(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::post cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    // 파일 업로드 할 때 사용함
    post2(endpoint: string, body: any, options?: RequestOptions) {
        this.loading.start('post2 '+ endpoint);

        if (!options) {
            options = new RequestOptions({withCredentials: true});
        }

        console.log('api post' + options);
        endpoint = this.replaceFirstCommand(endpoint);

        return this._http.post(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::post cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err); });
    }

    put(endpoint: string, body: any, options?: RequestOptions, ignoreErrorAlert?: boolean) {
        this.loading.start('put '+ endpoint);

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        console.log('put ', BSApi.url + '/' + endpoint, body);
        // 보안 요청 : 페이지 네임 전달
        body = this._addPageNameParam(body);
        endpoint = this.replaceFirstCommand(endpoint);

        return this._http.put(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::put cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err, ignoreErrorAlert); });
    }

    delete(endpoint: string, params?: any, options?: RequestOptions) {
        this.loading.start('delete '+ endpoint);

        // 보안 요청 : 페이지 네임 전달
        params = this._addPageNameParam(params);

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

        endpoint = this.replaceFirstCommand(endpoint);

        return this._http.delete(BSApi.url + '/' + endpoint, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::delete cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err); });
    }

    patch(endpoint: string, body: any, options?: RequestOptions) {
        this.loading.start('patch '+ endpoint);

        if (!options) {
            options = new RequestOptions(this.defaultRequestOption);
        }

        endpoint = this.replaceFirstCommand(endpoint);

        return this._http.put(BSApi.url + '/' + endpoint, body, options)
            .map(res => { return this._respProcess(res); })
            .do(data => { console.log('bsapi::patch cmd / mtsc =>', endpoint , data);})
            .catch(err => { return this._errorHandler(err); });
    }
}

