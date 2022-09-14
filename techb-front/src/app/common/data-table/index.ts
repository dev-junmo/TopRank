import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BSButtonModule } from '../bs-button/bs-button.module';

import { DataTable} from './components/table';
import { DataTableColumn } from './components/column';
import { DataTableRow } from './components/row';
import { DataTablePagination } from './components/pagination';
import { DataTableHeader } from './components/header';

import { PixelConverter } from './utils/px';
import { Hide } from './utils/hide';
import { MinPipe } from './utils/min';

import { BSHeaderButtonConfig } from './components/bs-header-button-config';

export * from './components/types';
export * from './tools/data-table-resource';

export { DataTable, DataTableColumn, DataTableRow, DataTablePagination, DataTableHeader };
export const DATA_TABLE_DIRECTIVES = [ DataTable, DataTableColumn ];


@NgModule({
    imports: [ CommonModule, FormsModule, BSButtonModule, RouterModule
    ],
    declarations: [
        DataTable, DataTableColumn,
        DataTableRow, DataTablePagination, DataTableHeader,
        PixelConverter, Hide, MinPipe, BSHeaderButtonConfig
    ],
    exports: [ DataTable, DataTableColumn, BSHeaderButtonConfig ]
})
export class DataTableModule { }
