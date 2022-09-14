import { Component, OnInit, Input } from '@angular/core';
import { MainStore } from '../../../store/main.store';

@Component({
  selector: 'bs-left-menu',
  templateUrl: './bs-left-menu.component.html',
  styleUrls: ['./bs-left-menu.component.css']
})
export class BsLeftMenuComponent implements OnInit {

    @Input() usePlanshop: boolean = true;

    constructor(private mainStore : MainStore) { }

    ngOnInit() {
  
    }

}
