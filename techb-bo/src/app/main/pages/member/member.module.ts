import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 기본 모듈 입니다.
import { BOCommonModule } from '@app/common/bo-common.module';

// 리스트페이지의 경우 넣어주세요.
import { DataTableModule } from '@app/common/data-table/index';


// store
import { MemberListStore } from '@app/common/store/member-list.store';
import { GradeListStore } from '@app/common/store/grade-list.store';
import { GradeStore } from '@app/common/store/grade.store';
import { GradeBenefitStore } from '@app/common/store//grade-benefit.store';
import { KakaoStore } from '@app/common/store//kakao.store';

import { MemberRoutingModule } from './member.routing';
import { MemberComponent } from './member.component';

import { ControlValueAccessor } from '@angular/forms';

import { CsHistoryComponent } from './cs-history/cs-history.component';
import { GradeListPage } from './grade-list/grade-list.page';
import { MemberGroupComponent } from './member-group/member-group-list.page';

import { GradeCreatePage } from './grade-list/grade-create/grade-create.page';
import { GradeUpdateComponent } from './grade-update/grade-update.component';
import { GradeBenefitComponent } from './grade-benefit/grade-benefit.component';
//import { GradeBenefitUpdateComponent } from './grade-benefit-update/grade-benefit-update.component';
//import { AutogradeComponent } from './autograde/autograde.component';
import { SignoutComponent } from './signout/signout.component';

// member
import { MemberListPage } from './member/member-list/member-list.page';
import { MemberQueryForm } from './member/member-list/member-query-form/member-query-form';
import { MemberUpdateComponent } from './member/member-update/member-update';

import { ConfigStore } from '../../../common/store/config.store';
import { SendEmailListPage } from './email/send-email-list/send-email-list.page';
import { SendEmailQueryForm } from './email/send-email-list/send-email-query-form/send-email-query-form';

import { SendKakaoListPage } from './kakao/send-kakao-list/send-kakao-list.page';
import { SendKakaoQueryForm } from './kakao/send-kakao-list/send-kakao-query-form/send-kakao-query-form';
import { EmailConfigUpdatePage } from './email/email-config/email-config-update';
import { KakaoConfigUpdatePage } from './kakao/kakao-config/kakao-config-update';




@NgModule({
  imports: [
    MemberRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTableModule,
    BOCommonModule
  ],
  declarations: [
    MemberListPage,
    MemberQueryForm,
    MemberUpdateComponent,
    
    GradeListPage,
    MemberGroupComponent,
    GradeCreatePage,
    GradeUpdateComponent,
    MemberComponent,
    CsHistoryComponent,
    GradeBenefitComponent,
    //GradeBenefitUpdateComponent,
    //AutogradeComponent,
    SignoutComponent,

    //send email
    EmailConfigUpdatePage,
    SendEmailQueryForm,
    SendEmailListPage,

    //kakao
    SendKakaoQueryForm,
    SendKakaoListPage,
    KakaoConfigUpdatePage


  ],
  providers: [
    MemberListStore, 
    GradeListStore, 
    GradeStore , 
    ConfigStore, 
    GradeBenefitStore , 
    KakaoStore
  ]
})

export class MemberModule { }
