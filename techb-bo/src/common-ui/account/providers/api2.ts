import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http";


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api2 {
  url: string = 'http://breezestudio.co.kr:9000';
 
  
  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {

    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {

    if (!options) {
      options = new RequestOptions();
    }


    console.log("api post"+ options);

    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  post2(endpoint: string, body: any, options?: RequestOptions) {

    if (!options) {
      options = new RequestOptions();
    }


    console.log("api post"+ options);

    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    
    if (!options) {
      options = new RequestOptions();
    }    
    
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {

    if (!options) {
      options = new RequestOptions();
    }

    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {

    if (!options) {
      options = new RequestOptions();
    }

    return this.http.put(this.url + '/' + endpoint, body, options);
  }



}
