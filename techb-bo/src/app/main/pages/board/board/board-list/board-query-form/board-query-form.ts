import { Component, Input } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'board-query-form',
  templateUrl: './board-query-form.html',
  styleUrls: ['./board-query-form.css'],
})
export class BoardQueryForm extends BOBaseQueryFormController {

    @Input() boardId: any;
    @Input() hasStepQuery: boolean = true;
    @Input() boardConfig: any;
    @Input() boardData: any;

    constructor() {
        super();
    }

    options = [];

    preparedFormControlsConfig() {

        let config = {
        search_text: [],
        reply: [],
        hidden: [],
        secret: [],
        category: [],
        regist_date: [],
        onlynotice: [],
        };

        return config;
    }


}
///////////////////////////////////////////////////////////////////

