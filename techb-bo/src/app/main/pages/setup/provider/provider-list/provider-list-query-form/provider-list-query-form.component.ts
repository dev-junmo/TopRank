import { Component } from '@angular/core';
import { BOBaseQueryFormController } from '@app/common/framework/bs-query-form.controller';

@Component({
  selector: 'provider-list-query-form',
  templateUrl: './provider-list-query-form.component.html',
  styleUrls: ['./provider-list-query-form.component.css']
})
export class ProviderListQueryFormComponent extends BOBaseQueryFormController {

  commission_type_options = ['수수료']; //등록유형 필드확인 필요
  commission_type_values = ['SACO']
 
  constructor() {
    super();
  }

  preparedFormControlsConfig() {

    let config = {
      provider_name: [],
      provider_status : [],
      info_type: [],
      calcu_count: [],
      'deli_group[0]': [],
      'deli_group[1]': [],
      commission_type: [],
    };

   return config;
  } 
}

//////////////////////////////////////////////////////////////////////////////////

// import { Component, OnInit, Injectable, Output, EventEmitter } from '@angular/core';
// import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

// @Component({
//   selector: 'app-provider-list-query-form',
//   templateUrl: './provider-list-query-form.component.html',
//   styleUrls: ['./provider-list-query-form.component.css']
// })
// export class ProviderListQueryFormComponent implements OnInit {
//   commission_type_options = ['수수료']; //등록유형 필드확인 필요
//   commission_type_values = ['SACO']
//   reply =['', 'y', 'n'];
//   status = ['','완료', '대기', '접수']; //게시글종류 필드확인 필요

//   selected;
//   searchResults;
//   public submitted: boolean;
//   formNotice : FormGroup;
 
//   private isShowMoreForm: boolean = true;

  

//   constructor(private fb : FormBuilder) {
    
//     this.formNotice = fb.group({
//       'regdate[min]': [],
//       'regdate[max]': [],
//       provider_status : [],
//       'deli_group[0]': [],
//       'deli_group[1]': [],
//       'info_type[0]': [],
//       'info_type[1]': [],
//       'calcu_count[0]': [],
//       'calcu_count[1]': [],
//       'calcu_count[2]': [],
//       commission_type: [],
//     });
//    }
   
//    ngOnInit() {
//     // let s = "2015-09-25";
//     // let dt = new Date(s.replace(/-/g, '/'));
//     // console.log(dt);
//     // console.log(this.formNotice.controls);
//     // console.log(moment(s).add(-6, 'months').format('YYYY-MM-DD'));

//     }

   
//   onSubmit() {
//     // console.log("ddddddddddddd",this.formNotice.value.deli_gruop[0]);

//     // this.formNotice.value.deli_group = [];
//     // if(this.formNotice.value.deli_group[0] == true)
//     //     this.formNotice.value.deli_group[0] = 'provider'
//     // else this.formNotice.value.deli_group[0] = null

//     // if(this.formNotice.value.deli_group[1] == true)
//     // this.formNotice.value.deli_group[1] = 'company'
//     // else this.formNotice.value.deli_group[1] = null

//     // if(this.formNotice.value.info_type[0] == true)
//     // this.formNotice.value.info_type[0] = '개인'
//     // else this.formNotice.value.info_type[0] = null

//     // if(this.formNotice.value.info_type[1] == true)
//     // this.formNotice.value.info_type[1] = '법인'
//     // else this.formNotice.value.info_type[1] = null


//     this.query.next(this.formNotice.value);
//     console.log(this.formNotice.value);
//   }

//   onClickShowMoreForm(){
//     this.isShowMoreForm = !this.isShowMoreForm;
//   }
  
// }
