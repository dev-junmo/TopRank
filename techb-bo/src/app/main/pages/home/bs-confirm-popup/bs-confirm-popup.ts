import { Component, OnInit ,TemplateRef, Input} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'bs-confirm-popup',
  templateUrl: './bs-confirm-popup.html',
  styleUrls: ['./bs-confirm-popup.css']
})
export class BSConfirm implements OnInit {

  modalRef: BsModalRef;  
  @Input() content: any;  
  @Input() confirmTxt: string = '확인';
  @Input() cancelTxt: string = '취소';  

  constructor(private modalService: BsModalService) { }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,    
      Object.assign({}, { class: 'gray modal-lg custom' })
    );
  }


  hideModal() {
    this.modalRef.hide();
  }
  ngOnInit() {
  }

}
