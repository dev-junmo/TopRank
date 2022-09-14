import { ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountModule } from './pages/account/account.module';
// import { GoodsComponent } from './goods/goods.component';
// import { MyPageModule } from './mypage/mypage.module';
//import { ErrorComponent } from './pages/error/error.component';
import { MainModule } from './pages/main/main.module';
import { environment } from '../environments/environment';

    ////////////////////////////////
    // production 
   
    // const routes: Routes = [
    //         { path: '', redirectTo: '/main/home', pathMatch: 'full' },
        
    //         // pages
    //         { path: 'main/index', redirectTo: '/main', pathMatch: 'full' }, 
        
    //         { path: 'main',  loadChildren: './pages/main/main.module#MainModule' }, 
    //         { path: 'account', loadChildren: './pages/account/account.module#AccountModule'},    
    // ];

    ////////////////////////////////
    // dev 
   
    const routes: Routes = [
        { path: '', redirectTo: '/main/home', pathMatch: 'full' },
    
        // pages
        { path: 'main/index', redirectTo: '/main', pathMatch: 'full' }, 
        { path: 'main',  loadChildren: () => MainModule }, //loadChildren: './pages/main/main.module#MainModule' },
        { path: 'account', loadChildren: () => AccountModule },
    
        // error
        //{ path: '**', component: ErrorComponent },        
        // {path: '/404', component: ErrorComponent , name: 'NotFound', },
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
