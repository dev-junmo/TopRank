import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as _ from 'underscore';

@Component({
  selector: 'bs-pagination',
  templateUrl: './bs-pagination.html',
  styleUrls: ['./bs-pagination.css']
})
export class BSPagination implements OnInit {

    //private first: boolean = true;

    @Input() countPerPage: number;
    @Input()
    set totalItemsCount(value:number) {
        console.log("set totalitemcount=", value);
        if (value === undefined) return;
        this._totalItemsCount = value;

        this.pager = this.getPager(this._totalItemsCount, 1);
        console.log("set totalItemsCount",this.pager, this._totalItemsCount, this.countPerPage, this.changedPage);

        // 처음이 아닌데 전체 페이지 수가 변하면 이벤트 발생

        /*todo
        게시판에서 2번페이지 1번 아이템을 삭제하면 페이지가 없어지고 이 경우 해당페이지 바꾸고 리로드 해야 한다.
        그런데 검색의 경우도 페이지가 바뀐다.
        이 경우 페이지네이션에서 신규페이지를 날리면 안됨
        */

        // if (this.first != true)
        //     this.changedPage.next(this.currentPage);

        //this.first = false;
    }

    private _totalItemsCount;

    @Input() currentPage: number = 1;

    @Output() changedPage = new EventEmitter();

    constructor(private http: Http) {

    }

    // array of all items to be paged
    allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
        //console.log("BSPagination::ngOnInit ", this.countPerPage, this._totalItemsCount, this.currentPage)
        //this.setPage(this.currentPage);
    }


    update(count) {

        console.log("update = ", this.currentPage, count);

        //this.totalItemsCount = count;
        //this.setPage(this.currentPage);
    }

    onClickPage(page: number) {

        console.log("setPage = ", page, this._totalItemsCount);

        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.getPager(this._totalItemsCount, page);

        // get current page of items
        //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

        this.changedPage.next(page); // fire event!!

        console.log("BSPagination::setPage pager",this.pager, this._totalItemsCount, this.countPerPage, this.changedPage)
    }

    /////////////////////////////
    //pager.service
    getPager(totalItemsCount: number, currentPage: number = 1) {
        // calculate total pages
        let totalPages = Math.ceil(totalItemsCount / this.countPerPage);
        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * this.countPerPage;
        let endIndex = Math.min(startIndex + this.countPerPage - 1, totalItemsCount - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItemsCount: totalItemsCount,     // 전체 아이템수
            currentPage: currentPage,   // 현재 페이지
            countPerPage: this.countPerPage,         // 페이지당 리스트 표시 수 : 10
            totalPages: totalPages,     // 전체 페이지수
            startPage: startPage,       // 표시에 시작 페이지
            endPage: endPage,           // 표시에 끝 페이지
            startIndex: startIndex,     // 리스트 시작 인덱스
            endIndex: endIndex,         // 리스트 끝 인덱스
            pages: pages                // 시작부터 끝까지의 배열 // 페이지 표시 반복 위해서
        };
    }
  /////////////////////
}
