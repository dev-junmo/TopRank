import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { LoginComponent } from './pages/auth/login.component';

import { NoAuthComponent } from './pages/noauth/noauth.component';


const routes: Routes = [
    {
        path: '', component: AccountComponent,
        children:[
            {path: '', component: LoginComponent },
            {path: 'noauth', component: NoAuthComponent },
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule { }
