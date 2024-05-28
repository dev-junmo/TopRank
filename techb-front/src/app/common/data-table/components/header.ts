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

    ///////////////////////////////////////////
    // 해더에 pagenation 부분을 가져와서 처리함 // 디자인이 그렇게 되어 있음

    get limit() {
        return this.dataTable.limit;
    }

    set limit(value) {
        this.dataTable.limit = Number(<any>value); // TODO better way to handle that value of number <input> is string?
    }

    onClickPrevPageBtn() {
        this.pageBack();
    }

    onClickNextPageBtn() {
        this.pageForward();
    }

    pageBack() {
        this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    }

    pageForward() {
        this.dataTable.offset += this.dataTable.limit;
    }


    // onClickSelectedDel() {
    //   console.log("this.dataTable.selectedRows",this.dataTable.selectedRows);
    //   alert(this.dataTable.selectedRows[0].item.name);      
    // }
}
