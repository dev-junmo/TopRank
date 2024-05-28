// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ///////////////////////////////////////////////////////////////////
// // OOlist 에 필요한 모듈
// // 사용하는 모듈에 추가해주세요.

// // 기본 모듈 입니다.
// import { BOCommonModule } from '@app/common/bo-common.module';

// // 리스트페이지의 경우 넣어주세요.
// import { DataTableModule } from '@app/common/data-table/index';

// /
// ///////////////////////////////////////////////////////////////////

// import { ProviderRoutingModule } from './provider.routing';
// import { ProviderComponent } from './provider.component';

// //import { BoardContentQueryForm } from './../board/board-content-list/board-query-form/board-query-form.component';
// import { UiSwitchModule } from 'ngx-toggle-switch';
// import { ProviderListComponent } from './provider-list/provider-list.component';
// import { ProviderListQueryFormComponent } from './provider-list/provider-list-query-form/provider-list-query-form.component';
// import { ProviderCreateComponent } from './provider-create/provider-create.component';
// import { ProviderDetailComponent } from './provider-detail/provider-detail.component';

// import { NgDaumAddressModule } from 'ng2-daum-address';
// import { ResponsiveModule, ResponsiveConfig } from 'ng2-responsive'

// let config = {
//   breakPoints: {
//       xs: {max: 600},
//       sm: {min: 601, max: 959},
//       md: {min: 960, max: 1279},
//       lg: {min: 1280, max: 1919},
//       xl: {min: 1920}
//   },
//   debounceTime: 100 // allow to debounce checking timer
// };


// export function ResponsiveDefinition(){
//         return new ResponsiveConfig(config);
// };

// @NgModule({
//   imports: [
//     CommonModule,
//     ProviderRoutingModule,
//     BOCommonModule,
//     DataTableModule,
//     UiSwitchModule,
//     FormsModule,
//     ReactiveFormsModule,
//     NgDaumAddressModule,
//     ResponsiveModule
//   ],
//   declarations: [
//     ProviderComponent,
//     ProviderListComponent,
//     ProviderListQueryFormComponent,
//     ProviderCreateComponent,
//     ProviderDetailComponent,
//   ],
//   providers: [
//     {provide: ResponsiveConfig,useFactory: ResponsiveDefinition },

//   ]
// })
// export class ProviderModule { }
