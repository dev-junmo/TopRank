import { Component } from '@angular/core';
import { BOBaseForm } from '@app/common/form//bo-base-form/bo-base-form';

@Component({
  selector: 'bo-showhide-form',
  templateUrl: './bo-showhide-form.html',
  styleUrls: ['./bo-showhide-form.css']
})
export class BOShowHideForm extends BOBaseForm {

  constructor() { 
    super();
  }

}

