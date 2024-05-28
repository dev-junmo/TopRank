import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { BOAuthGuard } from '../providers/service/bo-auth.guard';
// const crisisCenterRoutes: Routes = [
//     {
//       path: '',
//       component: CrisisCenterComponent,
//       children: [
//         {
//           path: '',
//           component: CrisisListComponent,
//           children: [
//             {
//               path: ':id',
//               component: CrisisDetailComponent,
//               canDeactivate: [CanDeactivateGuard],
//               resolve: {
//                 crisis: CrisisDetailResolver
//               }
//             },
//             {
//               path: '',
//               component: CrisisCenterHomeComponent
//             }
//           ]
//         }
//       ]
//     }
//   ];
const routes: Routes = [
   {
        path: '', component: MainComponent,
        children : [
            { path: '',   redirectTo: 'home', pathMatch: 'full' , },
            { path: 'home', loadChildren: './pages/home/home.module#HomeModule', canActivate : [BOAuthGuard] },
            { path: 'setup', loadChildren: './pages/setup/setup.module#SetupModule', canActivate : [BOAuthGuard]  },
            { path: 'log', loadChildren: './pages/log/log.module#LogModule', canActivate : [BOAuthGuard]  },
            // { path: 'goods', loadChildren: './pages/goods/goods.module#GoodsModule', canActivate : [BOAuthGuard]  },
            { path: 'product', loadChildren: './pages/product/product.module#ProductModule', canActivate : [BOAuthGuard]  },
            { path: 'order', loadChildren: './pages/order/order.module#OrderModule', canActivate : [BOAuthGuard]  },
            { path: 'board', loadChildren: './pages/board/board.module#BoardModule', canActivate : [BOAuthGuard]  },
            { path: 'member', loadChildren: './pages/member/member.module#MemberModule', canActivate : [BOAuthGuard]  },
            { path: 'point', loadChildren: './pages/point/point.module#PointModule', canActivate : [BOAuthGuard]  },
            // { path: 'statistics', loadChildren: './pages/statistics/statistics.module#StatisticsModule', canActivate : [BOAuthGuard]  },
            // { path: 'calculate', loadChildren: './pages/calculate/calculate.module#CalculateModule', canActivate : [BOAuthGuard]  },
            // { path: 'event', loadChildren: './pages/event/event.module#EventModule', canActivate : [BOAuthGuard]  },
            { path: 'display', loadChildren: './pages/display/display.module#DisplayModule', canActivate : [BOAuthGuard]  },
            // { path: 'provider', loadChildren: './pages/provider/provider.module#ProviderModule' },
            // { path: 'crm', loadChildren: '../crm/crm.module#CrmModule'},
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
