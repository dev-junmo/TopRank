import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
//import { GradeBenefitComponent } from './grade-benefit/grade-benefit.component';
//import { AutogradeComponent } from './autograde/autograde.component';
import { SignoutComponent } from './signout/signout.component';
import { CsHistoryComponent } from './cs-history/cs-history.component';

// member
import { MemberListPage } from './member/member-list/member-list.page';
import { MemberUpdateComponent } from './member/member-update/member-update'

import { GradeListPage } from './grade-list/grade-list.page';
import { GradeUpdateComponent } from './grade-update/grade-update.component';
//import { GradeBenefitUpdateComponent } from './grade-benefit-update/grade-benefit-update.component';
import { SendEmailListPage } from './email/send-email-list/send-email-list.page';
import { SendKakaoListPage } from './kakao/send-kakao-list/send-kakao-list.page';
import { EmailConfigUpdatePage } from './email/email-config/email-config-update';
import { KakaoConfigUpdatePage } from './kakao/kakao-config/kakao-config-update';

import { MemberGroupComponent } from './member-group/member-group-list.page';


const routes: Routes = [{
    path: '',
    component: MemberComponent,
    children: [
      { path: '', redirectTo: 'list'},

      // member 
      { path: 'member', redirectTo: 'member/list',  pathMatch: 'full' },
      { path: 'member/list', component: MemberListPage },
      { path: 'member/update/:id', component: MemberUpdateComponent },

      { path: 'cs-history', component: CsHistoryComponent },
      { path: 'member-group', component: MemberGroupComponent},

      { path: 'grade', component: GradeListPage },
      { path: 'grade/:id', component: GradeUpdateComponent },
      //{ path: 'grade-benefit', component: GradeBenefitComponent },
      //{ path: 'grade-benefit/:id', component: GradeBenefitUpdateComponent },

      //{ path: 'autograde', component: AutogradeComponent },
      { path: 'signout', component: SignoutComponent },


      //email
      { path: 'email', redirectTo: 'email/list',  pathMatch: 'full' },
      { path: 'email/list', component: SendEmailListPage },
      { path: 'email/config', component: EmailConfigUpdatePage },

        //kakao
        { path: 'kakao', redirectTo: 'kakao/list',  pathMatch: 'full' },
        { path: 'kakao/list', component: SendKakaoListPage },
        { path: 'kakao/config', component: KakaoConfigUpdatePage },

        // { path: 'goods', redirectTo: 'goods/list',  pathMatch: 'full' },
        // { path: 'goods/list', component: GoodsListPage },
        // { path: 'goods/update/:id', component: GoodsCreateComponent },
        // { path: 'goods/create', component: GoodsCreateComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }

/*
const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: CrisisCenterComponent,
    children: [
      {
        path: '',
        component: CrisisListComponent,
        children: [
          {
            path: ':id',
            component: CrisisDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              crisis: CrisisDetailResolver
            }
          },
          {
            path: '',
            component: CrisisCenterHomeComponent
          }
        ]
      }
    ]
  }
];
*/

