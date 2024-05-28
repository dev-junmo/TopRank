import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomePageComponent } from './pages/home/home.page';


const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        children:[
            // { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '', component: HomePageComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
