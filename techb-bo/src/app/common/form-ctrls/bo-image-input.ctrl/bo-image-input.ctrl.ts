import { Component, Injectable, Input, ContentChildren, QueryList } from '@angular/core';
import { BOBaseForm } from '@app/common/form/bo-base-form/bo-base-form';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BSOptionConfig } from './bo-period-input-config';

//import { BSFileUploader } from '../../../../../../common/core/bs-fileuploader';
import { BSFileUploader } from '@bricks/common/core/bs-fileuploader';
import { BSUUIDService } from '@bricks/common/core/bs-uuid.service';
import { BSAlertService } from '@bricks/common/ui/bs-alert/index';

@Component({
  selector: 'bo-image-input',
  templateUrl: './bo-image-input.ctrl.html',
  styleUrls: ['./bo-image-input.ctrl.css']
})
export class BOImageInputCtrl extends BOBaseForm {
    public _file;
    subForm: FormGroup;
    @Input() set file(value) {
        this._file = value;
    }

    // file info
    @Input() fileName;
    @Input() folderName: string = 'default'; // folderName 말고 다른 이름으로 변경

    @Input() width:number;  // upload된 후 resize될 이미지 크기
    @Input() height:number; // upload된 후 resize될 이미지 크기
    @Input() quality: number;

    // control option
    @Input() type: string = 'large';    // large, samll
    @Input() hasDeleteBtn: boolean = true;
    @Input() inputWidth: number = 400;

    // description
    @Input() imageTypeDesc: string;
    @Input() imageSizeDesc: string;
    @Input() noticeDesc: string;

    // 이미지업로더를 쓰는데 파일도 허용하는 기능이 필요함
    // 그런데 이미지업로더api를 사용하니 이미지가 아닌 경우 서버에서 오류를 주고 있음
    // 해당 타입의 경우 이미지라 하더라고 파일로 호출함 
    @Input() onlyImageFile: boolean = true;
    
    private cacheFile;
    private isRemoveFile = false;
    private seq: number;

    private ablePreview = true;

    constructor(private fb: FormBuilder,
        private fileUploader: BSFileUploader,
        private alert : BSAlertService,
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

        console.log('BOImageInputCtrl::onInit ctrl =>', this.ctrl);
        console.log('BOImageInputCtrl::onInitAterView');
    }

    onInitAterView() {

    }

    // 컨트롤에 값이 patch, set되면 호출됨
    onValueChanged(data) {
        console.log('BOImageInputCtrl::onValueChanged name, file =>', this.formGroup, data);
        this._file = data;

        console.log('onValueChanged data =>', data);
        // 파일 확장자가 이미지파일이면 preview가 활성화 된다.
        this.ablePreview = false;
        if (data && data.length > 2) {
            let ext = data.substr(data.length -3, 3);
            ext = ext.toLowerCase();
            if (ext == 'jpg' || ext == 'png' || ext == 'jpeg' || ext == 'bmp' || ext == 'gif') {
                this.ablePreview = true;
            }
        }
    }

    onFileUpload($event) {
        console.log("fileupload event", $event);

        if (this.onlyImageFile) {
            this.fileUploader.imageUpload($event, this.folderName, this.width, this.height, this.quality).subscribe((resp=>{
                console.log('onFileUpload resp =>', resp, this.name);
                this._file = resp.url;
                this.cacheFile = '';
                this.subForm.get('isRemoveFile').setValue(false);
                this.ctrl.setValue(resp.url);
                this.ablePreview = (resp.mime.substr(0, 5) == 'image');
            }));    
        } else {
            this.fileUploader.fileUpload($event, null, this.folderName).subscribe((resp=>{
                console.log('onFileUpload resp =>', resp, this.name);
                this._file = resp.url;
                this.cacheFile = '';
                //this.fileName = resp.org_name;
                this.subForm.get('isRemoveFile').setValue(false);
                this.ctrl.setValue(resp.url);
                this.ablePreview = (resp.mime.substr(0, 5) == 'image');
                //this.onFileUploaded.emit({url: resp.url, fileName: this.fileName});
            })); 
        }        
    }
    // ablePreview

    onChangeRemoveFile(value) {
        //this.isRemoveFile = !this.isRemoveFile;
        console.log("isRemoveFile = ", value, this.file);

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

    onClickPreviewImage(file) {
        console.log('onClickPreviewImage =>', file);
        window.open(file, '_blank');
    }

}
