////////////////////////////////////////////////////////////////////
//  BSFileUploader
//  Ver 0.001

import {Observable} from 'rxjs/Rx';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";

import { BSApi } from './bs-api';

@Injectable()
export class BSFileUploader{
    constructor(public api: BSApi, ) { }

    /*
        media/image/저장할 폴더이름
            이미지로 인식되서 리사이즈 기능 지원
            thumbnail resize기능

        media/file/저장할 폴더이름

    */

    private uploadFileApiUrl: string = 'media/file';
    private uploadImageApiUrl: string = 'media/image';
    private folderName: string = 'default';

    /*
    let thumbnailData = [
        {width: 1000 , height: 750},  // large, 미사용
        {width: 450 , height: 450 },  // view
        {width: 335 , height: 335 },  // list1
        {width: 270 , height: 270 },  // list2
        {width: 82 , height: 115 },   // thumbView, 미사용
        {width: 90 , height: 90 },    // thumbCart
        {width: 60 , height: 84 },    // thumbScroll, 미사용
        {width: 150 , height: 150 },  // mobileMain
        //{width: 335 , height: 470 },// thumbProgram, 미사용
      ]
    */

    public imageUpload(event, folderName?, width?, height?, quality?) {
       
        if (folderName) {
            this.folderName = folderName;
        }

        let fileList: FileList = event.target.files;
        if(fileList.length < 1) {
            //   return; // 왜 주석 처리 했지?
        }

        let file: File =  fileList[0];
        let formData:FormData = new FormData();

        formData.append('file', fileList[0]);

        if(width && height) {
            formData.append('size[width]', width);
            formData.append('size[height]', height);
        }

        if (quality) {
            formData.append('size[quality]', quality);
        }

        console.log("formdata =>", formData);

        let headers = new Headers();
        console.log(headers);     
        headers.append('Accept', 'application/json');
        headers.append('enctype', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers });
        return this.api.post2(this.uploadImageApiUrl + '/' + this.folderName, formData, options);
    }

    public imageUploadForMultiSize(event, folderName?, thumbnailData?) {

        if (folderName) {
            this.folderName = folderName;
        }
        //let subject : Subject<any> = new Subject<any>();

        let fileList: FileList = event.target.files;
        if(fileList.length < 1) {
        //   return;
        }

        let file: File =  fileList[0];
        let formData:FormData = new FormData();


        formData.append('file', fileList[0]);

        if(thumbnailData) {
            let i = 0;
            for(let image of thumbnailData) {
                let widthStr = 'thumbnail_size[' + i + '][width]';
                let heightStr = 'thumbnail_size[' + i + '][height]';
                let quality = 'thumbnail_size[' + i + '][quality]';
                formData.append(widthStr, image.width);
                formData.append(heightStr, image.height);
                formData.append(quality, image.quality);
                i++;
            }
        }

        console.log("formdata =", formData);

        let headers = new Headers();
        console.log(headers);
        //headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        headers.append('enctype', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers });
        return this.api.post2(this.uploadImageApiUrl + '/' + this.folderName, formData, options);
    }

    public removeImage(image) {
        return this.api.delete(this.uploadImageApiUrl + '/' + this.folderName + '/' + image);
    }


    public fileUpload(event, uploadUrl?, folderName?) {

        if (uploadUrl) {
            this.uploadFileApiUrl = uploadUrl;
        }

        if (folderName) {
            this.folderName = folderName;
        }

        //let subject : Subject<any> = new Subject<any>();
        console.log(event);

        let fileList: FileList = event.target.files;
        if(fileList.length < 1) {
        //   return;
        }

        let file: File =  fileList[0];
        return this.upload(file);
    }

    public upload(file, uploadUrl?) {
        let formData:FormData = new FormData();
        formData.append('file', file);

        console.log("file =", file);
        console.log("formdata =", formData);

        let url;
        if (uploadUrl) {
            url = uploadUrl;
        } else {
            // media/file /default
            url = this.uploadFileApiUrl + '/' + this.folderName;
        }

        let headers = new Headers();
        //headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        headers.append('enctype', 'multipart/form-data');

        let options = new RequestOptions({ headers: headers , withCredentials: true });
        console.log('BSFileUploader::upload url =>', url);
        return this.api.post2(url, formData, options);
    }
}
