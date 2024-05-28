import { ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProviderComponent } from './provider.component';

import { GuidePageComponent } from './guide/guide/guide.page';
// import { MainComponent } from './main/main.component';
import { BOAuthGuard } from './providers/service/bo-auth.guard';
import { BOProviderAuthGuard } from './providers/service/bo-auth.provider.guard';

const routes: Routes = [
    { path: '',   redirectTo: '/main/home/dashboard', pathMatch: 'full', },
    
    { path: 'main', loadChildren: './main/main.module#MainModule', canActivate : [BOAuthGuard] },
    { path: 'crm/:id', loadChildren: './crm/crm.module#CrmModule', canActivate : [BOAuthGuard] },
    { path: 'login', loadChildren: './account/account.module#AccountModule', },
    { path: 'guide', component: GuidePageComponent},

    // 입점사 관리도구
    { path: 'provider', component: ProviderComponent, children: [
        { path: '', redirectTo: '/provider/main/home',  pathMatch: 'full'},
        { path: 'main', loadChildren: './main/main.module#MainModule', canActivate : [BOProviderAuthGuard] },
        { path: 'login', loadChildren: './account/account.module#AccountModule', },
        { path: 'guide', component: GuidePageComponent},
    ]}

    //{ path: '**', component: PageNotFoundComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }





