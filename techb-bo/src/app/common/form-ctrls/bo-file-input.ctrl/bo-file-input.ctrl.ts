import { Component, Injectable, Input, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { BOBaseForm } from '@app/common/form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BSOptionConfig } from './bo-period-input-config';

//import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
import { BSFileUploader } from '@bricks/common/core/bs-fileuploader';
import { BSUUIDService } from '@bricks/common/core/bs-uuid.service';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'bo-file-input',
  templateUrl: './bo-file-input.ctrl.html',
  styleUrls: ['./bo-file-input.ctrl.css']
})
export class BOFileInputCtrl extends BOBaseForm {

    public _file;
    subForm: FormGroup;
    @Input() set file(value) {
        this._file = value;
    }

    @Input() fileName;
    @Input() hasDeleteBtn: boolean = true;
    @Input() fileType:string;
    @Input() fileSize: string;
    @Input() noticeText:string;
    @Input() width: '425px';

    /////////////////////////////////
    //
    @Input() uploadUrl: string;
    @Input() folderName: string;

    @Output() onFileUploaded = new EventEmitter();

    public cacheFile;
    public isRemoveFile = false;
    public seq: number;

    constructor(private fb: FormBuilder,
        private fileUploader: BSFileUploader,
        private alert : BSAlertService,
        private sanitizer: DomSanitizer,
        private bsUUIDService: BSUUIDService) {
        super();
        this.seq = bsUUIDService.seq();

    }

    onInit() {
        this.subForm = this.fb.group({
            isRemoveFile : []
        });

        this.subForm.get('isRemoveFile').valueChanges.subscribe(data => this.onChangeRemoveFile(data));

        console.assert(this.ctrl);
        this.ctrl.valueChanges.subscribe(data => this.onValueChanged(data));

        console.log('BOFileInputCtrl::onInit ctrl =>', this.ctrl);
        console.log('BOFileInputCtrl::onInitAterView');
    }

    onInitAterView() {
       
    }

    // 컨트롤에 값이 patch, set되면 호출됨
    onValueChanged(data) {
        this._file = data; //this.sanitizer.bypassSecurityTrustResourceUrl(data);
        console.log('BOFileInputCtrl::onValueChanged name, file =>', this.formGroup, data, this._file);
    }

    onFileUpload($event) {
        console.log("fileupload event", $event);
        // let seq:boolean = true;
        this.fileUploader.fileUpload($event, this.uploadUrl, this.folderName).subscribe((resp=>{
            console.log('onFileUpload resp =>', resp, this.name);
            this._file = resp.url;
            this.cacheFile = '';
            this.fileName = resp.org_name;
            this.subForm.get('isRemoveFile').setValue(false);
            this.ctrl.setValue(resp.url);
            this.onFileUploaded.emit({url: resp.url, fileName: this.fileName});
        }));
    }

    onChangeRemoveFile(value) {
        //this.isRemoveFile = !this.isRemoveFile;
        console.log("onChangeRemoveFile isRemoveFile =>", value, this._file);

        if (value === true) {
            this.cacheFile = this._file;
            this.ctrl.setValue('');
        } else {
            if (this.cacheFile) {
                this.ctrl.setValue(this.cacheFile);
                this.cacheFile = '';
            }
        }
    }

    onFileDownload(file) {
        console.log('onFileDownload file =>', file);

        if (file && file.length > 0) {
            window.open(file, '_blank');
        }
    }
}
