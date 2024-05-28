// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// import { ProviderComponent } from './provider.component';
// import { ProviderListComponent } from './provider-list/provider-list.component'
// import { ProviderCreateComponent } from './provider-create/provider-create.component';
// import { ProviderDetailComponent } from './provider-detail/provider-detail.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: ProviderComponent,
//     children: [
//       { path: '',redirectTo: 'list' , pathMatch: 'full'},
//       { path: 'list', component: ProviderListComponent },
//       { path: 'create', component: ProviderCreateComponent }, // UI가 많이 달라서 생성, 수정 따로
//       { path: ':id', component: ProviderDetailComponent }, // 수정
//     ]
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class ProviderRoutingModule { }


