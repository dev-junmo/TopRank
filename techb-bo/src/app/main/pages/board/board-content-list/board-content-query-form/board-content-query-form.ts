import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'board-content-query-form',
  templateUrl: './board-content-query-form.html',
  styleUrls: ['./board-content-query-form.css'],
})
export class BoardContentQueryForm extends BOBaseQueryFormController {

 constructor() {
   super();
 }
 
 preparedFormControlsConfig() {

   let config = {
    hidden : [],
    category: [''],
    'period':'',
    search_text : []
   };

   return config;
  } 
}
