// import { BSPagination } from './../bs-pagination/bs-pagination';
// import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';

// @Component({
//   selector: 'bs-list-view',
//   templateUrl: './bs-list.view.html',
//   styleUrls: ['./bs-list.view.css']
// })
// export class BSListView implements OnInit {

//     private list: Array<any> = [];

//     @Input() id: any;
//     @ViewChild('pagiNation') pagiNation : BSPagination;

//     private option : any = {
//         countPerPage : 10,
//         currentPage : 1
//     };
//     private listLength;
//     private currentPage : any = 1;

//     constructor(private http: Http) {

//     }

//     ngOnInit() {

//         this.loadList(this.currentPage);

//         /*
//         //this.id   <= board id
//         if (this.id) {
//             //this.board

//             //this.currentPage = this.option.currun

//             this.boardStore.get(this.id, this.currentPage).subscribe() {

//                 //this.option = resp.option;
//                 //this.list = resp.list;
//                 //this.author
//             };

//             //http://breezestudio.co.kr:9000/board/3233
//             //response
//                 // board option
//         }
//         */

//     }

//     loadList(page) {

//         this.http.get('http://breezestudio.co.kr:9000/notice?limit=10&page='+ page)
//         .map((response: Response) => response.json())
//         .subscribe(data => {
//             // set items to json response
//             this.list = data.list;
//             console.log("board data",data.list, this.list);

//             this.listLength = data.total;
//             //this.pagiNation.update(this.listLength);
//             console.log("pagiNation", this.pagiNation);

//             this.pagiNation.update(this.listLength);
//         });



//         /*
//         this.boardStore.get(this.id, page).subscribe() {

//             //this.option = resp.option;
//             //this.list = resp.list;
//             //this.author
//         };
//         */
//     }

//     changedPage(page) {
//         this.currentPage = page;
//         console.log("this.currentPage",this.currentPage);
//         this.loadList(page);
//     }

// }
