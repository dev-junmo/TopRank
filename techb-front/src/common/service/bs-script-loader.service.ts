// import {ScriptStore} from "./script.store";

declare var document: any;

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class BSScriptLoaderService {

    private scripts: any = {};
    constructor() {
        // ScriptStore.forEach((script: any) => {
        //     this.scripts[script.name] = {
        //         loaded: false,
        //         src: script.src
        //     };
        // });
    }   
    
    // load(...scripts: string[]) {
    //     var promises: any[] = [];
    //     scripts.forEach((script) => promises.push(this.loadScript(script)));
    //     return Promise.all(promises);
    // }
    load(src: string): Observable<any> {

        console.log('BSScriptLoaderService::load src = ', src);

        return new Observable<any>((observer: Observer<any>) => {
           
            setTimeout(() => {
                let scriptElement = document.createElement('script');
                scriptElement.type = "text/javascript";
                scriptElement.src = src;
    
                scriptElement.onload = () => {
                    observer.next({});
                    observer.complete();
                };
    
                scriptElement.onerror = (error: any) => {
                    observer.error("Couldn't load script " + src);
                };
    
                document.getElementsByTagName('body')[0].appendChild(scriptElement);                
            }, 1);

        });
    }
}
