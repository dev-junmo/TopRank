////////////////////////////////////////////////////////////////////
//  BSCommonModule
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FormsModule, ReactiveFormsModule, ControlValueAccessor,  } from '@angular/forms';


import { BSApi } from './core/bs-api';
import { BSLoadingService } from './core/bs-loading';
import { BSFileUploader } from './core/bs-fileuploader';
import { BSUUIDService } from './core/bs-uuid.service';
// pipe
import { BSAuthToStringPipe } from './pipe/auth.pipe';
import { BSHighlightKeyowrdPipe } from './pipe/string.pipe';
import { BSRemoveTagPipe, BSPasswordPipe, BSLineBreakPipe, BSStringLimitPipe, SanitizeHtmlPipe } from './pipe/string.pipe';
import { BSDateKrPipe } from './pipe/date.pipe';

// ui
import { RatingModule } from 'ngx-bootstrap';
import { BSRatingComponent } from './ui/bs-rating/bs-rating.component';
import { BSTubeBar } from './ui/bs-tube-bar/bs-tude-bar'

//import { NgDaumAddressModule } from 'ng2-daum-address';
import { BSDaumAddressBtn } from './ui/bs-daum-address-btn/bs-daum-address-btn';
import { DaumAddressComponent } from './ui/bs-daum-address-btn/daum-address.component';

// ui > alert, confirm, modal popup
import { BSAlertComponent, BSAlertService } from './ui/bs-alert/index';
import { BSModal, BSModalService } from './ui/bs-modal/index';
import { BSModalDialog, BSModalDialogService } from './ui/bs-modal-dialog/index';
import { ModalModule } from 'ngx-bootstrap/modal';

import { EditorModule } from '@tinymce/tinymce-angular';
import { BSEditorCtrl } from './ui/bs-editor/bs-editor.ctrl';

//import { BSBaseListController } from './ui/bs-list-ctrl/bs-base-list-controller';

// ui > list
// import { BSListCtrl } from './ui/bs-list-ctrl/bs-list-ctrl';
// import { BSList } from './ui/bs-list-ctrl/bs-list/bs-list';
// import { BSListHeader } from './ui/bs-list-ctrl/bs-list/bs-list-header/bs-list-header';
// import { BSListItem } from './ui/bs-list-ctrl/bs-list/bs-list-item/bs-list-item';
// import { BSGridListItem } from './ui/bs-list-ctrl/bs-grid-list/bs-grid-list-item/bs-grid-list-item';
// import { BSGridList } from './ui/bs-list-ctrl/bs-grid-list/bs-grid-list';
// import { BSComments } from './ui/bs-list-ctrl/bs-comments/bs-comments';
// import { BSComment } from './ui/bs-list-ctrl/bs-comments/bs-comment/bs-comment';
import { BSPagination } from './ui/bs-list-ctrl/bs-pagination/bs-pagination';
import { ResponsiveModule } from 'ng2-responsive';
import { FieldTransPipe } from './pipe/field.trans.pipe';
import { TelephoneTypeDirective } from './directive/telephone-type.directive';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpModule,
    FormsModule,

    // ui
    RatingModule,
    ModalModule.forRoot(),
    //NgDaumAddressModule,
    ResponsiveModule,

    EditorModule,
  ],
  declarations: [

    // pipe
    BSAuthToStringPipe,
    BSHighlightKeyowrdPipe,
    BSRemoveTagPipe,
    BSPasswordPipe,
    BSDateKrPipe,
    BSLineBreakPipe,
    BSStringLimitPipe,
    SanitizeHtmlPipe,
    FieldTransPipe,

    // ui
    BSRatingComponent,
    BSTubeBar,
    BSDaumAddressBtn,
    DaumAddressComponent,

    // ui > modal
    BSAlertComponent, BSModal, BSModalDialog,

    // ui > page
    BSPagination,

    BSEditorCtrl,

    // directive
    TelephoneTypeDirective

    //BSListCtrl, BSList, BSListHeader, BSListItem

  ],
    exports:[
      // pipe
      BSHighlightKeyowrdPipe,
      BSRemoveTagPipe,
      BSPasswordPipe,
      BSDateKrPipe,
      BSAuthToStringPipe,
      BSLineBreakPipe,
      BSStringLimitPipe,
      SanitizeHtmlPipe,
      FieldTransPipe,
      // ui
      BSRatingComponent,
      BSTubeBar,
      BSDaumAddressBtn,
      BSPagination,
      // directive
      TelephoneTypeDirective,
      DaumAddressComponent
    ],
    providers: [
        BSApi,
        BSLoadingService,
        BSUUIDService,
        BSFileUploader,
        BSAlertService, BSModalService, BSModalDialogService,
        FieldTransPipe,
    ],
    entryComponents: [
        BSAlertComponent, BSModal, BSModalDialog
    ],
})

export class BSCommonModule {

  constructor() {

  }

}

