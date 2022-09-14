import {
    Component, Input, Inject, forwardRef, Output, EventEmitter, OnDestroy, AfterViewInit
} from '@angular/core';
import { DataTable } from './table';

@Component({
    selector: '[dataTableRow]',
    templateUrl: './row.html',
    styleUrls: ['./row.css']
})
export class DataTableRow implements OnDestroy, AfterViewInit  {

    @Input() useRowSpan: boolean = false;
    @Input() item: any;
    @Input() index: number;

    @Input() expanded: boolean;

    @Input() columes;

    @Input() appendItemCount: number = 0;
    // public _columes;
    // @Input() set columes(columes) {
    //     this._columes = columes;


    // }

    // _disabled

    get disabled() {
        return this._disabled;
    }

    @Input() set disabled(disabled) {
        this._disabled = disabled;
        //this.selectedChange.emit(disabled);
    }

    // row selection:
    @Output() selectedChange = new EventEmitter();

    static _seq = 0;

    private _id = 0;
    private _selected: boolean;
    private _disabled: boolean;

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {
        this.increaseSeq();
        this._id = DataTableRow._seq;
    }

    ngAfterViewInit() {
        //console.log('DataTableRow::ngAfterViewInit  columes, item =>', this.columes, this.item);

        let columes = [];
        // for(let colume of this.columes) {
        //     if (!colume.isRowSpan || this.item.rowspan != 0) {
        //         columes.push(colume);
        //     }
        // }

        this.columes.toArray().forEach(colume => {
            if (!colume.isRowSpan || this.item.rowspan != 0) {
                columes.push(colume);
            }
        });

        this.columes = columes;
        //console.log('DataTableRow::ngAfterViewInit  columes =>', this.columes);
    }

    get id() {
        return this._id;
    }

    increaseSeq() {
        //console.log('row seq', DataTableRow._seq);
        return ++DataTableRow._seq;
    }

    // selected
    get selected() {
        return this._selected;
    }

    set selected(selected) {

        // disabled상태에서 전체 선택값이 안먹도록 함
        if (this.disabled == true) {
            return;
        }
        this._selected = selected;
        this.selectedChange.emit(selected);
    }

    get displayIndex() {

        if (this.index == undefined) {
            return '';
        }

        if (this.dataTable.indexAsc) {
            if (this.dataTable.pagination) {
                return this.dataTable.displayParams.offset + this.index + 1;
            } else {
                return this.index + 1;
            }
        } else {
            if (this.dataTable.pagination) {
                //console.log('displayIndex itemCount, offset, index =>', this.dataTable.itemCount, this.dataTable.displayParams.offset, this.index);
                if (!this.appendItemCount) {
                    this.appendItemCount = 0;
                }
                return this.dataTable.itemCount - this.dataTable.displayParams.offset - this.index + this.appendItemCount;
            } else {
                return this.dataTable.items.length - this.index;
            }
        }
    }

    getTooltip() {
        if (this.dataTable.rowTooltip) {
            return this.dataTable.rowTooltip(this.item, this, this.index);
        }
        return '';
    }



    ngOnDestroy() {
        this.selected = false;
    }

    _this = this; // FIXME is there no template keyword for this in angular 2?
}
