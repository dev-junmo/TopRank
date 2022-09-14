import { Directive, Input, ContentChild, OnInit } from '@angular/core';
import { DataTableRow } from './row';
import { CellCallback } from './types';


@Directive({
  selector: 'data-table-column'
})
export class DataTableColumn implements OnInit {

    // basic
    @Input() header: string;
    @Input() sortable = false;
    @Input() resizable = false;
    @Input() property: string;

    @Input() isRowSpan: boolean = false;

    // style
    @Input() styleClass: string;
    @Input() align:string = 'center';
    @Input() clickable: boolean = false;
    @Input() middle:string = 'middle'; 

    @Input() clickCursor:boolean = false;
    @Input() cellColors: CellCallback;
    @Input() backgroundColor: string;
    @Input() borderRight:boolean = false;

    @Input() width: number | string;
    @Input() height: number | string;
    @Input() visible = true;

    @Input() link: string;

    //@Input() textEllipsis: boolean = true;

    @ContentChild('dataTableCell') cellTemplate;
    @ContentChild('dataTableHeader') headerTemplate;

    getCellColor(row: DataTableRow, index: number) {
        if (this.cellColors !== undefined) {
            return (<CellCallback>this.cellColors)(row.item, row, this, index);
        }
    }

    private styleClassObject = {}; // for [ngClass]

    ngOnInit() {
        this._initCellClass();
    }

    private _initCellClass() {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            } else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }

        if (this.styleClass != null) {
            this.styleClassObject = {
                [this.styleClass]: true
            };
        }
    }
}
