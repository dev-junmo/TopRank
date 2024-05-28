import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MypageComponent } from './mypage.component';
import { EditProfilePageComponent } from './pages/edit-profile/edit-profile.page';
import { InquiryHistoryPageComponent } from './pages/inquiry-history/inquiry-history.page';
import { PointChargeHistoryPageComponent } from './pages/point-charge-history/point-charge-history.page';
import { PointHistoryListPageComponent } from './pages/point-history/pages/point-history-list/point-history-list.page';
import { RewardPointHistoryListPageComponent } from './pages/point-history/pages/reward-point-history-list/reward-point-history-list.page';
import { MypageHomePage } from './pages/mypage-home/mypage-home.page'; 
import { PointUsageHistoryPageComponent } from './pages/point-usage-history/point-usage-history.page';
import { MypagePointHistoryPage } from './pages/mypage-point-history/mypage-point-history.page';

const routes: Routes = [
    { 
        path: '', 
        component: MypageComponent,
        // canActivate: [AuthGuard],
        children:[
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { 
                path: 'home', 
                component: MypageHomePage,
                children: [
                   //{ path: '', redirectTo: 'point', pathMatch: 'full' },
                    { path: 'point', component: PointHistoryListPageComponent },
                    { path: 'reward-point', component: RewardPointHistoryListPageComponent },
                ]
            },
            { 
                path: 'point-history', 
                component: MypagePointHistoryPage,
                children: [
                    { path: '', redirectTo: 'point', pathMatch: 'full' },
                    { path: 'point', component: PointHistoryListPageComponent },
                    { path: 'reward-point', component: RewardPointHistoryListPageComponent },
                ]
            },
            { path: 'reward-point-history', component: RewardPointHistoryListPageComponent},
            { path: 'point-charge-history', component: PointChargeHistoryPageComponent },
            { path: 'point-usage-history', component: PointUsageHistoryPageComponent },
            { path: 'inquiry-history', component: InquiryHistoryPageComponent },
            { path: 'edit-profile', component: EditProfilePageComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MypageRoutingModule { }
