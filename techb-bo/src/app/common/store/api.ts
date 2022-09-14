import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from "@angular/http";

import { environment } from '@src/environments/environment';

export interface BSBaseUrl {
  baseUrl?: any;
  enabled?: boolean;
  type?: any;
}

/*
http
  .get('Some Url')
  .map(res => {
    // If request fails, throw an Error that will be caught
    if(res.status < 200 || res.status >= 300) {
      throw new Error('This request has failed ' + res.status);
    }
    // If everything went fine, return the response
    else {
      return res.json();
    }
  })
  .subscribe(
    (data) => this.data = data, // Reach here if res.status >= 200 && <= 299
    (err) => this.error = err); // Reach here if fails
    */

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {

  url: string = environment.apiURL;

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

  get2(endpoint: string, params?: any, options?: RequestOptions) {

    let baseUrl = environment.apiURL;

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
    return this.http.get( baseUrl + endpoint, options);
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
