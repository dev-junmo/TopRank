import { Component, Inject, forwardRef, Input } from '@angular/core';
import { DataTable } from './table';


@Component({
  selector: 'data-table-pagination',
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class DataTablePagination {

    @Input() isShowItemCount;

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {}

    // 이전페이지
    // pageBack() {
    //     this.dataTable.offset -= Math.min(this.dataTable.limit, this.dataTable.offset);
    // }

    // // 다음페이지
    // pageForward() {
    //     this.dataTable.offset += this.dataTable.limit;
    // }

    // 이전페이지
    prevPageGroup() {
        //this.dataTable.offset -= this.dataTable.limit * 10; //Math.min(this.dataTable.limit * 10, this.dataTable.offset);
        this.dataTable.offset =  Math.max(this.startPageOffset - this.dataTable.limit * 10, 0);
    }

    // 다음 페이지네이션
    nextPageGroup() {
        this.dataTable.offset =  Math.min(this.startPageOffset + this.dataTable.limit * 10, this._lastOffset());
    }

    firstOffset() {
        this.dataTable.offset = 0;
    }

    lastOffset() {
        this.dataTable.offset = (this.maxPage - 1) * this.dataTable.limit;
    }

    _lastOffset() {
        return (this.maxPage - 1) * this.dataTable.limit;
    }



    // 전체 페이지수
    get maxPage() {
        return Math.ceil(this.dataTable.itemCount / this.dataTable.limit);
    }

    // 한 페이지에 표시 개수
    get limit() {
        return this.dataTable.limit;
    }

    set limit(value) {
        this.dataTable.limit = Number(<any>value); // TODO better way to handle that value of number <input> is string?
    }

    // 현재 페이지
    get page() {
        return this.dataTable.page;
    }

    set page(value) {
        this.dataTable.page = Number(<any>value);
    }

    //////////////////////////////////
    // 새로 추가 기능 **

    // 페이지 표시 시작페이지 
    get startPage() {
        return Math.floor((this.page - 1) / 10) * 10 + 1;
    }

    get startPageOffset() {
        return this.startPage * this.dataTable.limit;
    }

    onClickPage(page) {
        if (page > this.maxPage) { return; }
        this.page = page;
    }
}
