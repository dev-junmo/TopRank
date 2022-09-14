import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { FindPwPageComponent } from './pages/find-pw/find-pw.page';
import { LoginPageComponent  } from './pages/login/login.page';
import { SignupPageComponent } from './pages/signup/signup.page';
import { SignupPhonePageComponent } from './pages/signup-phone/signup-phone.page';
import { SignupSelectionPageComponent } from './pages/signup-selection/signup-selection.page';

const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: '', component: AccountComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'signup', component: SignupSelectionPageComponent },
    { path: 'signup/:type', component: SignupPageComponent },
    // { path: 'signup-phone', component: SignupPhonePageComponent },
    { path: 'find-pw', component: FindPwPageComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountRoutingModule { }
