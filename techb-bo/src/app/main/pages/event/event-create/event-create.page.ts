// import { EventStore } from '@app/common/store/event.store';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
// import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';
// import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
// import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { BSBaseStore } from '@app/common/store/bs-base.store';


// @Component({
//   selector: 'event-create',
//   templateUrl: './event-create.page.html',
//   styleUrls: ['./event-create.page.css']
// })
// export class EventCreatePage extends BSUpdateFormController  {

//   // formBoard: FormGroup;
//   // private skinType = "default"; // 기본값

//   //public id = 0;

//   private isShowTootip: boolean = false;

//   constructor(
//               private eventStore: BSBaseStore,
//               private router: Router,
//               private route: ActivatedRoute,
//               alert: BSAlertService) {
//       super(eventStore, router, route, alert);

//     this.route.params.subscribe(params => {
//         console.log("params == > ", params);
//         this.id = params['id'];
//     });

//   }
//     /*
//       폼빌더에 값 넣어주기
//       1. 개별값
//       this.form.get('dept').setValue(selected.id)

//       2. 한번에 전달
//       this.form.setValues({username: this.user.username, mail: this.user.mail})

//     */

//     /*
//     this.heroForm = new FormGroup({
//       'name': new FormControl(this.hero.name, [
//         Validators.required,
//         Validators.minLength(4),
//         forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
//       ]),
//       'alterEgo': new FormControl(this.hero.alterEgo),
//       'power': new FormControl(this.hero.power, Validators.required)
//     });


//     class Validators {
//       static min(min: number): ValidatorFn
//       static max(max: number): ValidatorFn
//       static required(control: AbstractControl): ValidationErrors | null
//       static requiredTrue(control: AbstractControl): ValidationErrors | null
//       static email(control: AbstractControl): ValidationErrors | null
//       static minLength(minLength: number): ValidatorFn
//       static maxLength(maxLength: number): ValidatorFn
//       static pattern(pattern: string | RegExp): ValidatorFn
//       static nullValidator(c: AbstractControl): ValidationErrors | null
//       static compose(validators: (ValidatorFn | null | undefined)[] | null): ValidatorFn | null
//       static composeAsync(validators: (AsyncValidatorFn | null)[]): AsyncValidatorFn | null
//     }
//     */


//     // this.formBoard = fb.group({
//     //   id: [] /*new FormControl('', [Validators.required, Validators.minLength(4)])*/,
//     //   name: [],
//     //   skin_type: [],
//     //   auth_read: [],
//     //   auth_write: [],
//     //   auth_reply: [],
//     //   auth_cmt: [],
//     //   auth_read_use: [],
//     //   auth_write_use: [],
//     //   auth_reply_use: [],
//     //   auth_cmt_use: [],
//     //   autowrite_use: [],
//     //   secret_use: [],
//     //   writer_date: [],
//     //   write_admin_type: [],
//     //   write_admin: [],
//     //   recommend_type: [],
//     //   cmt_recommend_type: [],
//     //   pagenum: [],
//     //   gallery_list_w: [],
//     //   gallery_list_h: [],
//     //   icon_new_day: [],
//     //   icon_hot_visit: [],
//     //   video_use: [],
//     //   viedeo_type: [],
//     //   write_show: [],
//     //   list_show: [],
//     //   show_name_type: [],
//     //   show_grade_type: [],
//     //   restock_notify_use:[]
//     // });



//   // get id() { return this.formBoard.get('id'); }

//   initController(config: any) {
//     console.log("BSUpdateFormController::initController command=", config);
//     //{{baseUrl}}/common/config/basic

//     config.store.command = 'event/event';
//     //config.store.id = '';
//     config.title.crate = "이벤트 등록";
//     config.title.update = "이벤트 수정";
//     // console.log("this.adminID",this.id);

//     return config;
//   }

//   preparedFormControlsConfig() {
//     let config = {
//       event_type:[],
//       title:[],
//       display:[],
//       start_date:[],
//       end_date:[],
//       daily_event:[],
//       app_start_time:[],
//       app_end_time:[],
//       app_week:[],
//       goods_rule:[],
//       auction_type:[],
//       auction_group:[],
//       auction_bid_num:[],
//       auction_succ_num:[],
//       auction_price:[],
//       auction_luc_price: [],
//       sms_msg:[],
//       title_contents:[],
//       bgcolor:[],
//       banner_view:[],
//       banner_filename:[],
//       event_banner:[],
//       m_event_banner:[],
//       event_view:'',
//       event_introduce:[],
//       event_introduce_color:[],
//       m_event_introduce:[],
//       m_event_introduce_color:[],
//       use_coupon:[],
//       use_coupon_shipping:[],
//       use_code:[],
//       use_code_shipping:[],
//       goods_seq:[],
//       st_num:[],
//       saller_rate_type:[],
//       saller_rate:[],
//       saller_rate_num:[],
//       // benefits:this.fb.array([]),
//       // category:this.fb.array([]),
//       // except_category:this.fb.array([]),
//       // goods:this.fb.array([]),
//       // except_goods:this.fb.array([]),
//     };

//     return config;
//  }

//   // get searchWordsFormArray(): FormArray {
//   //   return this.bsForm.get('search_word') as FormArray;
//   // }

//   // searchWordsFromGroup(idx: string) {
//   //   let formArray = this.bsForm.get('search_word');
//   //   let name: string = idx.toString();
//   //   return formArray.get(name);
//   // }

//   preparedLoadData(resp) {
//     console.log("BSUpdateFormController::preparedLoadData resp =", resp);
//     // console.log("searchWordsFormArray", this.searchWordsFormArray.controls)
//     let data: any = resp;

//   //   this.bsForm.patchValue({
//   //     pc_image : resp.url
//   //  })
//     // data = resp;
//     // this.eventStore.get(this.id).subscribe( res => {
//     //   console.log(res);
//     //   // data = res
//     // })
//     // data.search_word = resp.list;
//     // data.popular_search = resp.popular_search;
//     // data.popular_search_limit_day = resp.popular_search_limit_day;


//     // this.disable = true; // 아현

//     // console.assert(data.popular_search);
//     return data;

//     //return resp;
//   }

//   preparedSaveData(value) {
//     console.log("BSUpdateFormController::preparedLoadData resp =", value);


//     return value;
//   }

//   // ngOnInit() {
//   // }

//   // onSubmit() {
//   //   alert("submit");
//   //   // this.submitted = true;
//   //   console.log(this.formBoard.value);

//   //   this.eventStore.create(this.formBoard.value).subscribe( resp => {
//   //     alert("보드생성!");
//   //   })
//   // }

//   // showTooltip(){
//   //   this.isShowTootip = true;
//   // }
//   // hideTooltop(){
//   //   this.isShowTootip = false;
//   // }
// }
