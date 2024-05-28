import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { BSUpdateFormController } from '@app/common/framework/bs-update-form.controller';

import { BSAlertService } from '@bricks/common/ui/bs-alert/index';
import { BSBaseStore } from '@app/common/store/bs-base.store';

@Component({
  selector: 'grade-create',
  templateUrl: './grade-create.page.html',
  styleUrls: ['./grade-create.page.css']
})
export class GradeCreatePage extends BSUpdateFormController {
  isDisabled = true;
  @Output() submited = new EventEmitter();

  constructor(
    baseStore: BSBaseStore,
    protected router: Router,
    route: ActivatedRoute,
    alert: BSAlertService) {

      super(baseStore, router, route, alert);
  }

 ///////////////////////////////////////////////////////
 // overide
 // 별도의 스토어를 안만들어도 되는 경우
 // 1. 그냥 basestore를 넣어준다. 그런데 basestore에서 command를 정의할 수 없으니
 // 2. initController를 override해서 command를 꼭 정의해주어야 한다.
  // initController(command: string) {

 //   command = 'common/config';
 //   console.log("BasicComponent::initController command=", command);
 //   return command;
 // }

 ///////////////////////////////////////////////////////
 // overide
 // 별도의 스토어를 안만들어도 되는 경우
 // 1. 그냥 basestore를 넣어준다. 그런데 basestore에서 command를 정의할 수 없으니
 // 2. initController를 override해서 command를 꼭 정의해주어야 한다.
 //
 // let config: any = {
 //     store: {
 //         command: '',
 //         id:''
 //     }
 // };

  initController(config: any) {
    console.log("BSUpdateFormController::initController command=", config);

    config.store.command = 'admin/member/membergroup';
    config.store.id = '';

    return config;
  }

 /////////////////////////////////////////////////////////
 //
 preparedFormControlsConfig() {

  let config = {
    group_name : [],
    use_type : ['AUTO'],
    'order_sum_use[0]': [],
    'order_sum_use[1]': [],
    'order_sum_ea[0]' : [],
    'order_sum_cnt[0]' : [],
    'order_sum_price[0]' : [],
    'order_sum_ea[1]' : [],
    'order_sum_cnt[1]' : [],
    'order_sum_price[1]' : [],
  };

   return config;
 }

 //////////////////////////////////////////
 // overide

 preparedLoadData(resp) {
     console.log("BSUpdateFormController::preparedLoadData resp =", resp);

     //let data: any = {};

     //data.domain = resp.domain.value;
     //...
     // 받을 때

     console.log("data =", resp);

     return resp;
 }

  //////////////////////////////////////////
  // overide

  preparedSaveData(value) {
    console.log("BSUpdateFormController::preparedLoadData resp =", value);

    return value;
  }

  //////////////////////////////////////////
  // overide : submit한 후처리에 필요

  public didSubmited() {
    this.submited.emit({});
  }


  //////////////////////////////////////////////
  // implement


}

/////////////////////////////////////////////////////////////////////////
// @Component({
//   selector: 'grade-create',
//   templateUrl: './grade-create.page.html',
//   styleUrls: ['./grade-create.page.css']
// })
// export class GradeCreatePage implements OnInit {

//   formGrade: FormGroup;

//   private skinType = "default"; // 기본값

//   private isShowTootip: boolean = false;

//   constructor(private fb: FormBuilder, private gradeStore: GradeStore) {

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


//     this.formGrade = fb.group({
//       group_name : [],
//       use_type : [],
//       'order_sum_use[]': [],
//       'order_sum_ea[0]' : [],
//       'order_sum_cnt[0]' : [],
//       'order_sum_price[0]' : [],
//       'order_sum_ea[1]' : [],
//       'order_sum_cnt[1]' : [],
//       'order_sum_price[1]' : [],
//     });


//   }

//   get id() { return this.formGrade.get('id'); }

//   ngOnInit() {
//   }

//   onSubmit() {
//     alert("submit");
//     // this.submitted = true;
//     console.log(this.formGrade.value);

//     this.gradeStore.create(this.formGrade.value).subscribe( resp => {
//       alert("보드생성!");
//     })
//   }

//   showTooltip(){
//     this.isShowTootip = true;
//   }
//   hideTooltop(){
//     this.isShowTootip = false;
//   }
// }
