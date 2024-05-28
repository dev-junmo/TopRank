import { Component, OnInit, Input ,ViewChild ,ElementRef, Output, EventEmitter, TemplateRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule, ControlValueAccessor,   } from '@angular/forms';

@Component({
  selector: 'bs-rating',
  templateUrl: './bs-rating.component.html',
  styleUrls: ['./bs-rating.component.css']
})
export class BSRatingComponent implements OnInit {

  public _isReadonly;
  @Input() values:number;
  @Input() max:number;
  @Input() set isReadonly(value){
    this._isReadonly = value;
  };
  @Input() style:string;

  @Output() clickItem = new EventEmitter();

  @ViewChild('star') templateStar:TemplateRef<any>;
  @ViewChild('star2') templateStar2:TemplateRef<any>;
  @ViewChild('bigStar') templateBigStar:TemplateRef<any>;
  @ViewChild('bigStarM') templateBigStarM:TemplateRef<any>;
  @ViewChild('smallStarM') templateSmallStarM:TemplateRef<any>;
  @ViewChild('bigStarRedM') templateBigStarRedM:TemplateRef<any>;
  @ViewChild('smallStarRedM') templateSmallStarRedM:TemplateRef<any>;
  constructor() { }

  ngOnInit() {
    console.log("style=>", this.style);
  }

  onClickValue(index){

    this.clickItem.emit(index + 1);

  }

  customTemplate() {
    if (this.style == 'star2') return this.templateStar2;
    else if(this.style == 'bigStar')  return this.templateBigStar;
    else if(this.style == 'bigStarM') return this.templateBigStarM;
    else if(this.style == 'smallStarM') return this.templateSmallStarM;
    else if(this.style == 'bigStarRedM') return this.templateBigStarRedM;
    else if(this.style == 'smallStarRedM') return this.templateSmallStarRedM;
    return this.templateStar;
  }

}
