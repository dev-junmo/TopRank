import { AppModule } from './app/app.module';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
   
    if (environment.production) {
        enableProdMode();

        // 주석 제거
        if (window) {
            window.console.log=function(){};
        }
    }

    // window.addEventListener('message', function(e) {
    //     if(e.origin == apiUrl && e.data && e.data.message) {
    //         alert(e.data.message);
    //     }
    // });


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
