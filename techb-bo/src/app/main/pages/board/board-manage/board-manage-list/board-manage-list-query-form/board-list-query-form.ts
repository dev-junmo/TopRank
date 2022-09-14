import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'board-list-query-form',
  templateUrl: './board-list-query-form.html',
  styleUrls: ['./board-list-query-form.css'],
})
export class BoardListQueryForm extends BOBaseQueryFormController {
    
    constructor() {
        super();
    }

    preparedFormControlsConfig() {

        let config = {
            search_text :[]
        };

        return config;
    }
}
