import { Component, OnInit, Injectable,  Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validator , FormBuilder } from '@angular/forms';
import { GradeStore } from '../../../../common/store/grade.store';
import { GradeBenefitStore } from '../../../../common/store/grade-benefit.store';

@Component({
  selector: 'app-grade-benefit',
  templateUrl: './grade-benefit.component.html',
  styleUrls: ['./grade-benefit.component.css']
})
export class GradeBenefitComponent implements OnInit {

  // @Output() sendObject = new EventEmitter<Object>();

  formGdBenefit : FormGroup;
  private hasCancelBtn = false;
  public gradeItems;
  public gradeTotal : number;
  public items;

  constructor(private fb : FormBuilder, private gradeStore : GradeStore, private gradeBenefitStore : GradeBenefitStore) { 
    this.formGdBenefit = this.fb.group({
      sale_title : [],
      sale_use: [],
      sale_limit_price: [],
      // sale_price_type: [],
      sale_option_price: [],
      // sale_option_price_type:[],
      sale_price: [],
      point_use: [],
      point_limit_price: [],
      point_price: [],
      reserve_price: [],
    })
 
  }
   
  ngOnInit() {
    this.getGradeList();
    this.getGradeData();
    this.formGdBenefit.valueChanges.subscribe((data=>{
      console.log(data);
    }));
  }


  // get grade list 
  getGradeList() {
    this.gradeStore.lostGradeList().subscribe(resp=>{      
      this.gradeTotal = resp.total;
      this.gradeItems = resp.list;
    });
  }

  //get grade detail data
  getGradeData() {
    this.gradeBenefitStore.loadBenefitData().subscribe(resp=>{
      console.log(resp);
      this.items = resp.list;

    });
  }


  // dd() {   
  //    this.sendObject.emit(this.hasCancelBtn);
  // }
}
