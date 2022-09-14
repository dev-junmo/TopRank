import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogComponent } from './log.component';
import { BasicLogComponent } from './basic-log/basic-log.component';
import { LogListComponent } from './log/log.component';

//provider
// import { ProviderListComponent } from './provider/provider-list/provider-list.component';
// import { ProviderCreateComponent } from './provider/provider-create/provider-create.component';
// import { ProviderMemberCreateComponent } from './provider/provider-create/provider-member-create/provider-member-create.component';

const routes: Routes = [{
    path: '',
    component: LogComponent,
    children: [
        { path: '', redirectTo: 'basic', pathMatch: 'full' },
        { path: 'basic', component: BasicLogComponent },
       
        { path: 'log', redirectTo: 'log/list',  pathMatch: 'full' },
        { path: 'log/list', component: LogListComponent },

        // { path: 'dashboard', component: DashboardComponent },
        // { path: 'cs', component: CsComponent },
        // { path: 'terms', component: TermsComponent },
        // { path: 'admin', component: AdminComponent },
        // { path: 'admin/update/:id', component: AdminUpdateComponent },
        // { path: 'admin/create', component: AdminUpdateComponent },
        // { path: 'search', component: SearchComponent },
        // { path: 'payment', component: PaymentComponent },
        // { path: 'inspect', component: InspectComponent },

        // provider
        // { path: 'provider', redirectTo: 'provider/list',  pathMatch: 'full' },
        // { path: 'provider/list', component: ProviderListComponent },
        // { path: 'provider/create', component: ProviderCreateComponent },
        // { path: 'provider/update/:id', component: ProviderCreateComponent },
        // { path: 'provider/:id', component: ProviderCreateComponent },

        // { path: 'provider/member/create', component: ProviderMemberCreateComponent },  
      
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }

