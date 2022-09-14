 import { Injectable } from '@angular/core';
import { CouponCopyPopup } from './coupon-copy.popup';
 import { BOModalDialogService } from '../bo-modal-dialog/index';

 @Injectable()
 export class CouponCopyPopupService {

     constructor(public modalService: BOModalDialogService) {
     }

     popup(seq) {
         return this.modalService.popupWidthComponent(CouponCopyPopup, '쿠폰 복사', '저장' ,'닫기', null, 'large');
     }

 }
