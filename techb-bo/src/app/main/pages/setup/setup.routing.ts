import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetupComponent } from './setup.component';
import { BasicComponent } from './basic/basic.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CsComponent } from './cs/cs.component';
import { TermsComponent } from './terms/terms.component';
import { AdminComponent } from './admin/admin.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { SearchComponent } from './search/search.component';
import { PaymentComponent } from './payment/payment.component';
import { InspectComponent } from './inspect/inspect.component';


//provider
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
//import { ProviderDetailComponent } from './provider/provider-detail/provider-detail.component';
import { ProviderCreateComponent } from './provider/provider-create/provider-create.component';
import { ProviderMemberCreateComponent } from './provider/provider-create/provider-member-create/provider-member-create.component';

const routes: Routes = [{
    path: '',
    component: SetupComponent,
    children: [
        { path: '', redirectTo: 'basic', pathMatch: 'full' },
        { path: 'basic', component: BasicComponent },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'cs', component: CsComponent },
        { path: 'terms', component: TermsComponent },
        { path: 'admin', component: AdminComponent },
        { path: 'admin/update/:id', component: AdminUpdateComponent },
        { path: 'admin/create', component: AdminUpdateComponent },
        { path: 'search', component: SearchComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'inspect', component: InspectComponent },

        // provider
        { path: 'provider', redirectTo: 'provider/list',  pathMatch: 'full' },
        { path: 'provider/list', component: ProviderListComponent },
        { path: 'provider/create', component: ProviderCreateComponent },
        { path: 'provider/update/:id', component: ProviderCreateComponent },
        { path: 'provider/:id', component: ProviderCreateComponent },

        { path: 'provider/member/create', component: ProviderMemberCreateComponent },  
      
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }

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
