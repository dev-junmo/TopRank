import { Component, ViewEncapsulation, Input, Inject, forwardRef, Output, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BOModalDialog } from '../bo-modal-dialog/index';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSModalService } from '@bricks/ui/bs-modal/index';
@Component({
    selector: 'excel-template-popup',
    templateUrl: './excel-template.popup.html',
    styleUrls: ['./excel-template.popup.css', '../bo-modal-dialog/bo-modal-dialog.css'],
    encapsulation: ViewEncapsulation.None
 })
export class ExcelTemplatePopup extends BOModalDialog implements OnInit {

    form: FormGroup;
    public type = 'order';

    constructor(bsModalRef: BsModalRef,
        private fb: FormBuilder,
        alert: BSAlertService) {

        super(bsModalRef);

        this.form = this.fb.group({
            seq: [],
            // title: [],
            // result:false
        });
        //  this.form = this.fb.group({
        //      name: [],
        //      title: [],
        //      result:false
        //  });
        // console.log("BOModalDialog::constructor bsModalRef = ", bsModalRef);
    }

    ngOnInit() {

        if (this.type == 'order') {
            this.form.get('seq').setValue(1);
        }

        if (this.type == 'export') {
            this.form.get('seq').setValue('EXPORT');
        }
    }

    onOk() {

        if (this.autoClose == true) {
            this.bsModalRef.hide();
        }

        if (this.subject) {
            this.subject.next(this.form.value.seq);
        }
    }

    onCancel() {

        this.bsModalRef.hide();
        this.subject.next(null);
    }

    // onSubmit(){
    //     if (!this.form.valid) {
    //         this.validateAllFormFields(this.form);
    //         this.form.get('result').setValue(false);
    //     }else{
    //         this.form.get('result').setValue(true);
    //     }

    //     if (this.autoClose == true && this.form.get('result').value) {
    //         this.bsModalRef.hide();
    //     }
    //     this.subject.next(this.form);
    // }

    // validateAllFormFields(formGroup: FormGroup) {
    //     Object.keys(formGroup.controls).forEach(field => {
    //         const control = formGroup.get(field);
    //         if (control instanceof FormControl) {
    //             control.markAsTouched({ onlySelf: true });
    //         } else if (control instanceof FormGroup) {
    //             this.validateAllFormFields(control);
    //         }
    //     });
    // }
}
