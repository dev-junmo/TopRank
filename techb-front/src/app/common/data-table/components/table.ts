import {
    Component, Input, Output, EventEmitter, ContentChildren, QueryList,
    TemplateRef, ContentChild, ViewChildren, OnInit, forwardRef, Inject
} from '@angular/core';
import { DataTableColumn } from './column';
import { DataTableRow } from './row';
import { DataTableParams, RowCallback, DataTableTranslations, defaultTranslations } from './types';
import { drag } from '../utils/drag';

import { BSHeaderButtonConfig } from './bs-header-button-config';

@Component({
  selector: 'data-table',
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class DataTable implements DataTableParams, OnInit {

    static _seq = 0;
    private _id = 0;
    private _items: any[] = [];

    @Input() get items() {
        return this._items;
    }

    set items(items: any[]) {
        this._items = items;
        if (items.length == 0) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
        }
        this._onReloadFinished();
    }
    @Input() itemCount: number;
    @Input() appendItemCount: number; // 공지사항 아이템을 위에 붙여주니 index가 안맞아서 

    @Input() itemsEx: any[] = [];

    // UI components:
    @ContentChildren(DataTableColumn) columns: QueryList<DataTableColumn>;
    @ContentChildren(BSHeaderButtonConfig) headerButons: QueryList<BSHeaderButtonConfig>;
    @ViewChildren(DataTableRow) rows: QueryList<DataTableRow>;
    @ContentChild('dataTableExpand') expandTemplate: TemplateRef<any>;

    // One-time optional bindings with default values:

    @Input() headerTitle: string;
    @Input() header = true;
    @Input() tableHeader = true;
    @Input() pagination = true;
    @Input() indexColumn = true;
    @Input() indexAsc = false;   // 추가함
    @Input() indexColumnHeader = '';
    @Input() rowColors: RowCallback;
    @Input() rowTooltip: RowCallback;
    @Input() selectColumn = false;
    @Input() multiSelect = true;
    @Input() substituteRows = false;
    @Input() expandableRows = false;
    @Input() translations: DataTableTranslations = defaultTranslations;
    @Input() selectOnRowClick = false;
    @Input() initialLoad = true;        // 외부주소 사용의 경우 이 값을 false로 만들어버림
    @Input() showReloading = false;
    @Input() isShowItemCount= true;
    @Input() hasScrollBarX = false;
    @Input() hasScrollBarY = false;
    @Input() tableWidth = '100%';
    @Input() expanded = false;
    @Input() appendTableHeader = false;
    @Input() freezeTableHeader = false;
    @Input() tableHeaderPosition = false;
    @Input() resizeTableBar = false;
    @Input() textEllipsis: boolean = false;
    @Input() hideScrollbar: boolean = false;
    @Input() useRowClick: boolean = false;  // 아직 사용안함, rowClick시 CSS 안변해서 만들어 놓음
    @Input() useRowSpan: boolean = false;   // table row구현을 tbody로 해서 rowspan이 안먹는다. 그래서 옵션을 두고 tbody를 안쓰는 타입으로 구분해서 구현함  
    @Input() isShowEmptyContent: boolean = false;
    public isEmpty: boolean = false;

    @ContentChild('appendTableHeaderTemplate') appendTableHeaderTemplate;
    @ContentChild('emptyContentTemplate') emptyContentTemplate;

    // UI state without input:
    indexColumnVisible: boolean;
    selectColumnVisible: boolean;
    expandColumnVisible: boolean;

    // UI state: visible ge/set for the outside with @Input for one-time initial values
    private _sortBy: string;
    private _sortAsc = false;
    private _offset = 0;
    private _limit = 10;
    
    @Input()
    get sortBy() {
        return this._sortBy;
    }

    set sortBy(value) {
        this._sortBy = value;
        //this._triggerReload(); // toto : 초기 로딩안되게 하려는데 여기서 로딩되서 뺌
    }

    @Input()
    get sortAsc() {
        return this._sortAsc;
    }

    set sortAsc(value) {
        this._sortAsc = value;
        //this._triggerReload(); // toto : toto 초기 로딩안되게 하려는데 여기서 로딩되서 뺌
    }

    @Input()
    get offset() {
        return this._offset;
    }

    set offset(value) {
        this._offset = value;
        this._triggerReload();
    }

    @Input()
    get limit() {
        return this._limit;
    }

    // limit가 변경이 되면 offset도 바뀌어야 한다.
    set limit(value) {
        this._limit = value;
        this.page = 1;
        //this._triggerReload();
    }

    // calculated property:

    @Input()
    get page() {
        return Math.floor(this.offset / this.limit) + 1;
    }

    set page(value) {
        this.offset = (value - 1) * this.limit;
        console.log('set page offset, value, limit =>', this.offset, value, this.limit);
    }

    // 임시
    setPageAndNoReload(value) {
        this._offset = (value - 1) * this.limit;
        console.log('setPageAndNoReload offset, value, limit =>', this._offset, value, this.limit);
    }

    get lastPage() {
        return Math.ceil(this.itemCount / this.limit);
    }

    // setting multiple observable properties simultaneously

    sort(sortBy: string, asc: boolean) {
        this.sortBy = sortBy;
        this.sortAsc = asc;

        // sortBy에서 trigger빼고 여기에 넣어줌
        this._triggerReload();
    }

    ngOnInit() {

        console.log("DataTable::ngOnInit");

        this.increaseSeq();
        this._id = DataTableRow._seq;

        this._initDefaultValues();
        this._initDefaultClickEvents();
        this._updateDisplayParams();

        console.log('DataTable::ngOnInit initialLoad, _sortBy =>', this.initialLoad, this._sortBy);

        if (this.initialLoad && this._scheduledReload == null) {
            this.reloadItems();
        }
    }

    private _initDefaultValues() {
        this.indexColumnVisible = this.indexColumn;
        this.selectColumnVisible = this.selectColumn;
        this.expandColumnVisible = this.expandableRows;
    }

    private _initDefaultClickEvents() {
        this.headerClick.subscribe(tableEvent => this.sortColumn(tableEvent.column));
        if (this.selectOnRowClick) {
             this.rowClick.subscribe(tableEvent => tableEvent.row.selected = !tableEvent.row.selected);
        }
    }

    get id() {
        return this._id;
    }

    increaseSeq() {
        //console.log('row seq', DataTableRow._seq);
        return ++DataTableRow._seq;
    }
    // Reloading:

    _reloading = false;

    get reloading() {
        return this._reloading;
    }

    @Output() reload = new EventEmitter();

    reloadItems() {
        this._reloading = true;
        this.reload.emit(this._getRemoteParameters());
    }

    private _onReloadFinished() {

        this._updateDisplayParams();

        this._selectAllCheckbox = false;
        this._reloading = false;
    }

    _displayParams = <DataTableParams>{}; // params of the last finished reload

    get displayParams() {
        return this._displayParams;
    }

    _updateDisplayParams() {
        this._displayParams = {
            sortBy: this.sortBy,
            sortAsc: this.sortAsc,
            offset: this.offset,
            limit: this.limit
        };
    }

    _scheduledReload = null;

    // for avoiding cascading reloads if multiple params are set at once:
    _triggerReload() {
        if (this._scheduledReload) {
            clearTimeout(this._scheduledReload);
        }
        this._scheduledReload = setTimeout(() => {
            this.reloadItems();
        });
    }

    // event handlers:

    @Output() rowClick = new EventEmitter();
    @Output() rowDoubleClick = new EventEmitter();
    @Output() headerClick = new EventEmitter();
    @Output() cellClick = new EventEmitter();

    @Output() onTableSelectChanged = new EventEmitter();

    rowClicked(row: DataTableRow, event) {
        if (this.useRowClick) {
            this.rowClick.emit({ row, event });
        }
    }

    rowDoubleClicked(row: DataTableRow, event) {
        this.rowDoubleClick.emit({ row, event });
    }

    headerClicked(column: DataTableColumn, event: MouseEvent) {
        if (!this._resizeInProgress) {
            this.headerClick.emit({ column, event });
        } else {
            this._resizeInProgress = false; // this is because I can't prevent click from mousup of the drag end
        }
    }

    cellClicked(column: DataTableColumn, row: DataTableRow, event: MouseEvent) {
        this.cellClick.emit({ row, column, event });
    }

    getDataTableParams(): DataTableParams {
        return this._getRemoteParameters();
    }

    // functions:

    private _getRemoteParameters(): DataTableParams {
        let params = <DataTableParams>{};

        if (this.sortBy) {
            params.sortBy = this.sortBy;
            params.sortAsc = this.sortAsc;
        }
        if (this.pagination) {
            params.offset = this.offset;
            params.limit = this.limit;
        }
        return params;
    }

    private sortColumn(column: DataTableColumn) {
        if (column.sortable) {
            let ascending = this.sortBy === column.property ? !this.sortAsc : true;
            this.sort(column.property, ascending);
        }
    }

    get columnCount() {
        let count = 0;
        count += this.indexColumnVisible ? 1 : 0;
        count += this.selectColumnVisible ? 1 : 0;
        count += this.expandColumnVisible ? 1 : 0;
        this.columns.toArray().forEach(column => {
            count += column.visible ? 1 : 0;
        });
        return count;
    }

    getRowColor(item: any, index: number, row: DataTableRow) {
        if (this.rowColors !== undefined) {
            return (<RowCallback>this.rowColors)(item, row, index);
        }
    }

    selectedRow: DataTableRow;
    selectedRows: DataTableRow[] = [];

    private _selectAllCheckbox = false;

    get selectAllCheckbox() {
        return this._selectAllCheckbox;
    }

    set selectAllCheckbox(value) {
        console.log('체크 value', value , this._selectAllCheckbox);
        this._selectAllCheckbox = value;
        this._onSelectAllChanged(value);
    }

    private _onSelectAllChanged(value: boolean) {
        this.rows.toArray().forEach(row => row.selected = value);
    }

    onRowSelectChanged(row: DataTableRow) {
        //console.log("selectedRows = ", this.selectedRows);
        console.log('onRowSelectChanged row =>', row);
        // maintain the selectedRow(s) view
        if (this.multiSelect) {
            let index = this.selectedRows.indexOf(row);
            if (row.selected && index < 0) {
                this.selectedRows.push(row);
            } else if (!row.selected && index >= 0) {
                this.selectedRows.splice(index, 1);
            }
        } else {
            if (row.selected) {
                this.selectedRow = row;
            } else if (this.selectedRow === row) {
                this.selectedRow = undefined;
            }
        }

        // unselect all other rows:
        if (row.selected && !this.multiSelect) {
            this.rows.toArray().filter(row_ => row_.selected).forEach(row_ => {
                if (row_ !== row) { // avoid endless loop
                    row_.selected = false;
                }
            });
        }

        //  이벤트 발생 추가함
        this.onTableSelectChanged.emit({row:row, selectedRows: this.selectedRows});
    }

    // other:

    get substituteItems() {
        return Array.from({ length: this.displayParams.limit - this.items.length });
    }

    // column resizing:

    private _resizeInProgress = false;

    private resizeColumnStart(event: MouseEvent, column: DataTableColumn, columnElement: HTMLElement) {
        console.log('resizeColumnStart event, column, columnElement =>', event, column, columnElement);
        this._resizeInProgress = true;
        drag(event, {
            move: (moveEvent: MouseEvent, dx: number) => {
                if (this._isResizeInLimit(columnElement, dx)) {
                    column.width = columnElement.offsetWidth + dx;

                    // 테이블 길이 고정일 경우 칼럼을 resize하면 안움직이는 문제 해결
                    if (this.tableWidth != '100%') {
                        let width = parseInt(this.tableWidth);
                        if (width > 0) {
                            width += dx;
                            this.tableWidth = width + 'px';
                        }
                    }
                }
            },
        });
    }

    resizeLimit = 30;

    private _isResizeInLimit(columnElement: HTMLElement, dx: number) {
        /* This is needed because CSS min-width didn't work on table-layout: fixed.
         Without the limits, resizing can make the next column disappear completely,
         and even increase the table width. The current implementation suffers from the fact,
         that offsetWidth sometimes contains out-of-date values. */
        if ((dx < 0 && (columnElement.offsetWidth + dx) <= this.resizeLimit) ||
            !columnElement.nextElementSibling || // resizing doesn't make sense for the last visible column
            (dx >= 0 && ((<HTMLElement> columnElement.nextElementSibling).offsetWidth + dx) <= this.resizeLimit)) {
            return false;
        }
        return true;
    }



}
