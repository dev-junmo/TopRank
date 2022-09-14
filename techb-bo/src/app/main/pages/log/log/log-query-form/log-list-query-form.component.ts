import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'log-list-query-form',
  templateUrl: './log-list-query-form.component.html',
  styleUrls: ['./log-list-query-form.component.css']
})
export class LogListQueryFormComponent extends BOBaseQueryFormController {
 
  constructor() {
    super();
  }

  preparedFormControlsConfig() {

    let config = {
    };

   return config;
  } 
}

