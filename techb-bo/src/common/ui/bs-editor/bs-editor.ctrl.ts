import { element } from 'protractor';
import { Component, ElementRef, OnInit, EventEmitter,Input, Output, Inject,ViewChild, ComponentRef } from '@angular/core';
// import * as image_custom from '../../../assets/js/tinyMce.js';
// import { EventObj } from '@tinymce/tinymce-angular/editor/Events.d';
//import { EditorModule } from '@tinymce/tinymce-angular';

import { BSApi } from '@bricks/common/core/bs-api';

//import { BOBaseForm } from '@app/common/form/bo-base-form/bo-base-form';
import { BSFileUploader } from '@bricks/common/core/bs-fileuploader';

//import { Http, RequestOptions, Headers } from "@angular/http";

declare var image_custom: any;

var self;

@Component({
  selector: 'bs-editor',
  templateUrl: './bs-editor.ctrl.html',
  styleUrls: ['./bs-editor.ctrl.css' ],//'../../../assets/css/editor.css'
  inputs: ['mceContent'],
  outputs: ['contentChanged']
})
export class BSEditorCtrl {

    @ViewChild('baseEditor') baseEditor: any;
    @Input() content: any;

    public tinymceConfig = {

        // enter시 자동으로 p tag추가 되는 현상 
        mode : "textareas",
        theme : "modern",
        
        force_br_newlines : false,
        force_p_newlines : false,
        forced_root_block : '',

        width:300,
        height: 300,
        language_url :'/assets/langs/ko_KR.js',
        plugins: 'codesample print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker help',
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        image_advtab: true,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',

        images_upload_handler: function (blobInfo, success, failure) {
            self.onImageUpload(blobInfo, success, failure);
        },
        templates: [
            // { title: 'Test template 1', content: 'Test 1' },
            // { title: 'Test template 2', content: 'Test 2' }
        ],
        content_css: [
            // '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            // '//www.tinymce.com/css/codepen.min.css'
        ],
        images_upload_credentials: true
    };

    constructor(public fileuploader: BSFileUploader, private api: BSApi) {
        //super();
        self = this;
    }

    onImageUpload(blobInfo, success, failure) {

        this.fileuploader.upload(blobInfo.blob()).subscribe((resp)=>{
            console.log("onImageUpload =>", resp);
            success(resp.url);
        });
    }

    // onInit() {
    //     console.assert(this.name);
    //     console.assert(this.formGroup);
    //     this.ctrl = this.formGroup.get(this.name);
    //     this.resetValidators();
    //     // console.log("7777777777777",image_custom );
    //     console.log("##################",this.elBaseChart);
    //     // setTimeout(() => {
    //     //   this.getcontent
    //     // }, 2000);

    //     var tmeEditor = this.elBaseChart;
    //     // console.log("2222222222222222222",tmeEditor.apiKey);

    // }

    // getcontent(){
    //     // this.elBaseChart.editor.getcontent;
    // }

    // resetValidators() {
    //     //new FormControl('', [Validators.required, Validators.minLength(4)])
    //     const formCtrl = this.formGroup.get(this.name);

    //     // let exisitingValidators = formCtrl.validators;
    //     // this.site_id_control.setValidators(Validators.compose([...existingValidators , exampleValidator]))
    // }

    // private elementRef: ElementRef;
    // private elementID: string;
    // private htmlContent: string;

    // public contentChanged: EventEmitter<any>;

    // constructor(@Inject(ElementRef) elementRef: ElementRef)
    // {
    //     this.elementRef = elementRef;

    //     var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    //     var uniqid = randLetter + Date.now();

    //     this.elementID = 'tinymce' + uniqid;
    //     this.contentChanged = new EventEmitter();
    // }

    // ngAfterViewInit()
    // {
    //     //Clone base textarea
    //     var baseTextArea = this.elementRef.nativeElement.querySelector("#baseTextArea");
    //     var clonedTextArea = baseTextArea.cloneNode(true);
    //     clonedTextArea.id = this.elementID;

    //     var formGroup = this.elementRef.nativeElement.querySelector("#tinyFormGroup");
    //     formGroup.appendChild(clonedTextArea);

    //     //Attach tinyMCE to cloned textarea
    //     tinymce.init(
    //         {
    //             mode: 'exact',
    //             height: 500,
    //             theme: 'modern',
    //             plugins: [
    //                 'advlist autolink lists link image charmap print preview anchor',
    //                 'searchreplace visualblocks code fullscreen',
    //                 'insertdatetime media table contextmenu paste code'
    //             ],
    //             toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    //             elements: this.elementID,
    //             setup: this.tinyMCESetup.bind(this)
    //         }
    //     );
    // }

    // ngOnDestroy() {
    //     //destroy cloned elements
    //     tinymce.get(this.elementID).remove();

    //     var elem = document.getElementById(this.elementID);
    //     elem.parentElement.removeChild(elem);
    // }

    // tinyMCESetup(ed) {
    //     ed.on('keyup', this.tinyMCEOnKeyup.bind(this));
    // }

    // tinyMCEOnKeyup(e) {
    //     this.contentChanged.emit(tinymce.get(this.elementID).getContent());
    // }

    // set mceContent(content) {
    //     this.htmlContent = content;
    // }

}

// declare const Editor;
// declare const mergeCss;
// declare const mergeJS;


/*

    app-bs-editor

*/

// import { Api } from './../../../providers/api';
// import { Component, ElementRef, OnInit, EventEmitter,Input, Output, Inject, ComponentRef } from '@angular/core';
// // import * as Editor from '../../../../assets/js/js/script_editor.js';

// declare var tinymce: any;


// @Component({
//   selector: 'app-bs-editor',
//   templateUrl: './bs-editor.component.html',
//   styleUrls: ['./bs-editor.component.css' /*, '../../../../assets/css/editor.css'*/],
//   inputs: ['mceContent'],
//   outputs: ['contentChanged']
//   // inputs:['content'],
//   // outputs:['editContent']
// })


// export class BOEditorCtrl implements OnInit{

//   @Input() content:any;
//   // @Output() editContent:any;

//   // constructor() { }

//   ngOnInit() {

//   }

//   private elementRef: ElementRef;
//   private elementID: string;
//   private htmlContent: string;

//   public contentChanged: EventEmitter<any>;

//   constructor(@Inject(ElementRef) elementRef: ElementRef)
//   {
//       this.elementRef = elementRef;

//       var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
//       var uniqid = randLetter + Date.now();

//       this.elementID = 'tinymce' + uniqid;
//       this.contentChanged = new EventEmitter();
//   }

//   ngAfterViewInit()
//   {
//       //Clone base textarea
//       var baseTextArea = this.elementRef.nativeElement.querySelector("#baseTextArea");
//       var clonedTextArea = baseTextArea.cloneNode(true);
//       clonedTextArea.id = this.elementID;

//       var formGroup = this.elementRef.nativeElement.querySelector("#tinyFormGroup");
//       formGroup.appendChild(clonedTextArea);

//       //Attach tinyMCE to cloned textarea
//       tinymce.init(
//           {
//               mode: 'exact',
//               height: 500,
//               theme: 'modern',
//               plugins: [
//                   'advlist autolink lists link image charmap print preview anchor',
//                   'searchreplace visualblocks code fullscreen',
//                   'insertdatetime media table contextmenu paste code'
//               ],
//               toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
//               elements: this.elementID,
//               setup: this.tinyMCESetup.bind(this)
//           }
//       );
//   }

//   ngOnDestroy() {
//       //destroy cloned elements
//       tinymce.get(this.elementID).remove();

//       var elem = document.getElementById(this.elementID);
//       elem.parentElement.removeChild(elem);
//   }

//   tinyMCESetup(ed) {
//       ed.on('keyup', this.tinyMCEOnKeyup.bind(this));
//   }

//   tinyMCEOnKeyup(e) {
//       this.contentChanged.emit(tinymce.get(this.elementID).getContent());
//   }

//   set mceContent(content) {
//       this.htmlContent = content;
//   }



// }
