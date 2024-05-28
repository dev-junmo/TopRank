 import { Injectable } from '@angular/core';
import { ExcelTemplatePopup } from './excel-template.popup';
 import { BOModalDialogService } from '../bo-modal-dialog/index';

 @Injectable()
 export class ExcelTemplatePopupService {

     constructor(public modalService: BOModalDialogService) {
     }

     popup(type ='order') {
         return this.modalService.popupWidthComponent(ExcelTemplatePopup, 'Excel 다운로드 템플릿 선택',
            '다운로드', '취소', { type: type }, 'small');
     }

 }
