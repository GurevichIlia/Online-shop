import { OnDestroy, AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableButton } from './table.interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {
  @Input() buttons: TableButton[];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() columns: { columnDef: string, header: string, cell: any }[];
  @Input() listDisplayedColumns: string[];
  @Input() isShowMenu = false;
  @Output() action = new EventEmitter();

  constructor() { }

  get existButtons() {
    return this.buttons;
  }

  ngOnChanges(simpleChange) {
    // if (this.paginatorOptions) {
    //   debugger
    //   this.paginator.pageIndex = this.paginatorOptions.pageIndex
    //   this.paginator.pageSize = this.paginatorOptions.pageSize
    // }


    // if (this.dataSource) {
    //   this.dataSource.sort = this.sort
    //   this.dataSource.paginator = this.paginator
    // }


    if (this.existButtons) {
      // this.existButtons.map(button => {
      //   if (!this.listDisplayedColumns.includes(button.label)) {
      //     this.listDisplayedColumns.push(button.label)
      //   }
      // })
      if (!this.listDisplayedColumns.includes('menu')) {
        this.listDisplayedColumns.unshift('menu');
      }

    }
  }

  ngOnInit() {

  }

  // ngAfterViewInit() {
  //   if (this.dataSource) {
  //     this.dataSource.sort = this.sort
  //     this.dataSource.paginator = this.paginator
  //   }

  //   if (this.paginatorOptions 
  //     // && this.paginatorOptions.pageIndex !== 0
  //     ) {
  //     this.paginator.pageIndex = this.paginatorOptions.pageIndex
  //     this.paginator.pageSize = this.paginatorOptions.pageSize
  //   }
  // }
  // Используем label  в массиве кнопок buttons как название для action 
  //  Use a label from the buttons array as name for an action;
  dispatchAction(action: string, id?) {
    this.action.emit({ action, item: id });
  }


}
