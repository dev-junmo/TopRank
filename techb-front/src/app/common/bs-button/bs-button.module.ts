import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BSButton } from './bs-button';

@NgModule({
    imports: [  CommonModule ],
    declarations: [
        BSButton
    ],
    exports: [ BSButton ]
})
export class BSButtonModule { }
