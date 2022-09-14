import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//home
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,  
    children: [

      { path: '', redirectTo: 'home'},
     

      { path: 'home', redirectTo: 'home/update',  pathMatch: 'full' },
      { path: 'home/update', component: HomeComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayRoutingModule { }


