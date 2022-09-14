import { Component, OnInit ,TemplateRef, Input} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'bs-alert-popup',
  templateUrl: './bs-alert-popup.html',
  styleUrls: ['./bs-alert-popup.css']
})
export class BSAlert implements OnInit {

  modalRef: BsModalRef;  
  @Input() content: any;  
  @Input() confirmTxt: string = '확인';  

  constructor(private modalService: BsModalService) { }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,    
      Object.assign({}, { class: 'gray modal-lg custom' })
    );
  }

  ngOnInit() {
  }

}
