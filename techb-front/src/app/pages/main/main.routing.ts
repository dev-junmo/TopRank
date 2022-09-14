import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { SectionModule } from './pages/section/section.module';
import { HomeModule } from './pages/home/home.module';
//import { environment } from '../../../environments/environment';

    //////////////////////////
    // product 

    // const routes: Routes = [
    //     {
    //         path: '', component: MainComponent,
    //         children:[
    //             { path: '', redirectTo: 'home', pathMatch: 'full' },
    //             { path: 'home', loadChildren: './pages/home/home.module#HomeModule'  },
    //             { path: 'section', loadChildren: './pages/section/section.module#SectionModule' },
    //         ]
    //     }
    // ];

    //////////////////////////
    // dev 

    const routes: Routes = [
        {
            path: '', component: MainComponent,
            children:[
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', loadChildren: () => HomeModule },
                { path: 'section', loadChildren: () => SectionModule },
            ]
        }
    ];    

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
