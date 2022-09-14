import { Component, OnInit, Input } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'bs-slider-component',
  templateUrl: './bs-slider-component.html',
  styleUrls: ['./bs-slider-component.css']
})
export class BSSliderComponent implements OnInit {

  @Input()
  set slides(value:Array<any>) {
     
      if (!value) return;
      this.slidesItems = value;
  }

  @Input() slidesPerView: number = 1;

  public slidesItems;
  public slideConfig: SwiperConfigInterface = {
    scrollbar: null,
    direction: 'horizontal',
    slidesPerView: 1,
    scrollbarHide: false,
    keyboardControl: true,
    mousewheelControl: false,
    scrollbarDraggable: true,
    scrollbarSnapOnRelease: true,
    pagination: 'number',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
  };

  constructor() {

  }

  ngOnInit() {
    console.log("this.slidesPerView =>", this.slidesPerView, this.slidesItems);
    this.slideConfig.slidesPerView = this.slidesPerView;
  }

  //slides: Array<any> =[1,2,3,4,5,6,7,8,9,10];
  onIndexChange(index: number) {

    console.log("onIndexChange index =", index);

  }

}
