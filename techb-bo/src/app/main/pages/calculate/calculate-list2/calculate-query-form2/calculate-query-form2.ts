    import { Component, Input } from '@angular/core';
    import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';
    import * as moment from 'moment';
    import { AppConfigService } from '@app/providers/service/app-config.service';

    @Component({
    selector: 'calculate-query-form2',
    templateUrl: './calculate-query-form2.html',
    styleUrls: ['./calculate-query-form2.css'],
    })
    export class calculateQueryForm2 extends BOBaseQueryFormController {

    private nowYear;
    private nowMonth;

    public years = [
    {
        title: '전체',
        value: '',
    }
    ];
    public month = [
    {
        title: '전체',
        value: '',
    }
    ];

    constructor(public appConfig: AppConfigService) {

        super();
    }

    preparedFormControlsConfig() {

        console.log('preparedFormControlsConfig nowYear =>', this.nowYear);

        let config = {
            account_s_y: [],
            account_s_m: [],
            account_e_y: [],
            account_e_m: [],

            search_text: [],
            provider_seq : [],
            channel: []
        };

        return config;
    }

    afterInitQueryForm() {

        this.nowYear = new Date().getFullYear().toString();
        this.nowMonth = new Date().getMonth() + 1;
        this.nowMonth = this.nowMonth.toString();

        if( this.nowMonth.length != 2) {
            this.nowMonth = '0' + this.nowMonth;
        }

        console.log('init nowYear =>', this.nowYear);

        this.loadYear();
        this.loadMonth();

        console.assert(this.bsForm);

        this.bsForm.get('account_s_y').setValue(this.nowYear);
        this.bsForm.get('account_s_m').setValue(this.nowMonth);
        this.bsForm.get('account_e_y').setValue(this.nowYear);
        this.bsForm.get('account_e_m').setValue(this.nowMonth);
    }

    willSubmit(query) {
        console.log(query);
        query['account_ym[min]'] = query.account_s_y + query.account_s_m;
        query['account_ym[max]'] = query.account_e_y + query.account_e_m;

        return query;
    }

    loadYear() {
        // let years = [];
        let year = new Date().getFullYear();

        // range.push(year);
        for (let i = 2016; i <= year; i++) {
        let j = String(i);
            this.years.push({title: j + '년' , value : j});
        }

        console.log('loadYear years =>', this.years);
    }

    loadMonth() {
        for(let i = 1; i < 13; i ++) {
        let m = String(i);
        let k = m;
        if(k.length != 2) {
            k = '0' + k;
        }
        this.month.push({title: m + '월' , value : k});
        }

        console.log('loadMonth month =>', this.month);

    }

    // 전체
    onClickAll() {

        this.bsForm.get('account_s_y').setValue('');
        this.bsForm.get('account_s_m').setValue('');
        this.bsForm.get('account_e_y').setValue('');
        this.bsForm.get('account_e_m').setValue('');
    }

}


//////////////////////////////////////////////////////////
// import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
// import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// import { BOGroupCheckBoxCtrl, BOCheckBoxConfig } from '@app/common/bo-common.module';

// @Component({
//   selector: 'member-query-form',
//   templateUrl: './member-query-form.html',
//   styleUrls: ['./member-query-form.css'],

// })
// export class MemberQueryForm implements OnInit {


//   options = ['', '1', '2', '3', '4']; // 등록유형 필드확인 필요
//   reply = ['', 'y', 'n'];
//   status = ['', '완료', '대기', '접수']; // 게시글종류 필드확인 필요

//   selected;
//   searchResults;

//   public submitted: boolean;


//   formMember: FormGroup;

//   constructor(private fb: FormBuilder) {

//     this.formMember = this.fb.group({
//       keyword:[],
//       'provider_seq' : []
//     });
//    }
//    ngOnInit() {
//     // let s = "2015-09-25";
//     // let dt = new Date(s.replace(/-/g, '/'));
//     // console.log(dt);
//     // console.log(this.formNotice.controls);
//     // console.log(moment(s).add(-6, 'months').format('YYYY-MM-DD'));
//     this.formMember.valueChanges.subscribe((data=>
//     console.log(data)))
//     }

//   onSubmit() {
//     alert("submit");
//     this.query.next(this.formMember.value);
//   }

//   onCheckboxChange(event) {
//     console.log("aaaaaaaaaaa =", event.target.id);
//     let ctrl = this.formMember.get(event.target.id);

//     console.log("aaaaaaaaaaa1", ctrl.value);

//     if (ctrl.value) {
//       ctrl.patchValue('y');
//     } else {
//       ctrl.patchValue('');
//     }

//     console.log("aaaaaaaaaaa2", ctrl.value);
//   }
// }
