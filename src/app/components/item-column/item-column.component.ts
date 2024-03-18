import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
// import {
//   BooksBoardActions,
//   IBook,
//   IBookColumnItemCollection,
//   IBooksBoard,
//   selectColumnsItems,
// } from '../../../../store';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// import { Store } from '@ngrx/store';
// import { PopupPortalService } from '../popup-portal/service/popup-portal.service';
// import { BookCardComponent } from '../book-card/book-card.component';
import { Subject } from 'rxjs';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntil, tap } from 'rxjs/operators';
import { ColumnConfig } from '../models/column-config.model';

@Component({
  selector: 'app-item-column',
  standalone: true,
  imports: [
    NgClass,
    CdkDropList,
    AsyncPipe,
    CdkDrag,
    CdkDragPlaceholder,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem,
    CdkMenuBar,
    MatButtonModule,
    MatIconModule,
    // BookCardComponent,
    CdkDragHandle,
  ],
  templateUrl: './item-column.component.html',
  styleUrl: './item-column.component.scss'
})
export class ItemColumnComponent implements OnInit {
  isOpen = false;
  @Input({required: true}) config!: ColumnConfig;
  selectedItems = [];
  hideColumn(): void{}
  deleteColumn(): void {}
  drop(event: any): void{}
  attachList(): void {}

  ngOnInit(): void {
    console.log('%c INIT CONFIG ', 'color:blue;background:white', {c: this.config});
  }
}
