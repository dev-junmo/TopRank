import { Component, Input, Inject, forwardRef } from '@angular/core';
import { DataTable } from './table';
import { BSButton } from '../../bs-button/bs-button';

@Component({ 
    selector: 'data-table-header',
    templateUrl: './header.html',
    styleUrls: ['./header.css'],
    host: {
      '(document:click)': '_closeSelector()'
    }
})
export class DataTableHeader {

    @Input() buttons;
    @Input() selectedRows = 0;
    columnSelectorOpen = false;

    _closeSelector() {
        this.columnSelectorOpen = false;
    }

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {

        // this.columns.toArray().forEach(column => {
        //   count += column.visible ? 1 : 0;
        // });
    }

    onClickBtn(id) {        
        this.buttons.toArray().forEach(button => {
            if (button.id == id) {
                button.fireOnClick(this.selectedRows);  // BOPageButtonConfig에서 click event를 발생하게 함
            }            
        });    
    }

    // onClickSelectedDel() {
    //   console.log("this.dataTable.selectedRows",this.dataTable.selectedRows);
    //   alert(this.dataTable.selectedRows[0].item.name);      
    // }
}
