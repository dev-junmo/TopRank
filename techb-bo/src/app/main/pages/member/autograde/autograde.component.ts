// import { Component, OnInit } from '@angular/core';
// import { ConfigStore } from './../../../../common/store/config.store';
// import * as moment from 'moment';

// @Component({
//   selector: 'app-autograde',
//   templateUrl: './autograde.component.html',
//   styleUrls: ['./autograde.component.css']
// })
// export class AutogradeComponent implements OnInit {
//   month = ['1', '2', '3', '4', '5' ,'6', '7', '8', '9', '10', '11', '12'];
//   termMonth = ['1','3', '6', '12' ,' 18', '24' , '36' ]
//   day =['1', '15'];

//   public grade;
//   constructor(public configStore : ConfigStore) {
//     // this.day =  Array(31).fill(31).map((x,i)=>i)
//   }

//   ngOnInit() {
//     this.loadGradeData();
//   }

//   loadGradeData() {
//     this.configStore.reloadGrade().subscribe(resp=>{
//       console.log(resp);
//       this.grade = resp;
//     })
//   }
// }
