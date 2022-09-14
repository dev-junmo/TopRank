import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { BoardModule } from './pages/board/board.module';
import { DashboardPageComponent } from './pages/dashboard/dashboard.page';
import { MypageModule } from './pages/mypage/mypage.module';
import { PaymentModule } from './pages/payment/payment.module';
import { PopularKeywordPageComponent } from './pages/popular-keyword/popular-keyword.page';


import { RankingTrackingDetailPageComponent } from './pages/ranking-search/ranking-tracking-detail/ranking-tracking-detail.page'; 

import { RankingSearchPageComponent } from './pages/ranking-search/ranking-search/ranking-search.page'; 
import { SearchKeywordPageComponent } from './pages/search-keyword/search-keyword.page';
import { SubscriptionModule } from './pages/subscription/subscription.module'; 
import { TrendPageComponent } from './pages/trend/trend.page';
import { SectionComponent } from './section.component';

// guards
import { AuthGuard, AuthProductViewGuard } from '../../../../service/auth.guard';

    // product 
    // const routes: Routes = [
    //     {
    //         path: '', component: SectionComponent,
    //         children:[
    //             { path: 'dashboard', component: DashboardPageComponent,  canActivate: [AuthGuard]},
    //             { path: 'search-keyword', component: SearchKeywordPageComponent },
    //             { path: 'ranking-search', component: RankingSearchPageComponent },
    //             { 
    //                 path: 'ranking-tracking-detail/:goods_seq', 
    //                 component: RankingTrackingDetailPageComponent, 
    //                 canActivate: [AuthProductViewGuard]
    //             },
    //             { path: 'trend', component: TrendPageComponent },
    //             { path: 'popular-keyword', component: PopularKeywordPageComponent },
    //             { path: 'mypage', loadChildren:'./pages/mypage/mypage.module#MypageModule',  canActivate: [AuthGuard] },
    //             { path: 'subscription', loadChildren: './pages/subscription/subscription.module#SubscriptionModule',  canActivate: [AuthGuard] },
    //             { path: 'payment', loadChildren: './pages/payment/payment.module#PaymentModule' }, 
    //             { path: 'board', loadChildren:'./pages/board/board.module#BoardModule'},

    //         ]
    //     }
    // ];
    
    const routes: Routes = [
        { 
            path: '',
            component: SectionComponent,
            children:[
                { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                { path: 'search-keyword', component: SearchKeywordPageComponent },
                { path: 'ranking-search', component: RankingSearchPageComponent },
                { 
                    path: 'ranking-tracking-detail/:goods_seq', 
                    component: RankingTrackingDetailPageComponent, 
                    canActivate: [AuthProductViewGuard]
                },
                { path: 'trend', component: TrendPageComponent },
                { path: 'popular-keyword', component: PopularKeywordPageComponent },
                { path: 'mypage', loadChildren: ()=> MypageModule, canActivate: [AuthGuard] },
                { path: 'board', loadChildren: ()=> BoardModule },
                { path: 'subscription', loadChildren: ()=> SubscriptionModule, canActivate: [AuthGuard] },
                { path: 'payment', loadChildren: ()=> PaymentModule },
            ]
        },
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SectionRoutingModule { }
