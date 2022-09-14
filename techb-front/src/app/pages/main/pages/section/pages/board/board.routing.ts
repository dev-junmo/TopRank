import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';
import { FaqPageComponent } from './pages/faq/faq.page';
import { NoticePageComponent } from './pages/notice/notice.page';


const routes: Routes = [
    { 
        path: '',
        component: BoardComponent,
        // canActivate: [AuthGuard],
        children:[
            // { path: '', redirectTo: '', pathMatch: 'full' },
            { path: 'notice', component: NoticePageComponent },
            { path: 'faq', component: FaqPageComponent },
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BoardRoutingModule { }
