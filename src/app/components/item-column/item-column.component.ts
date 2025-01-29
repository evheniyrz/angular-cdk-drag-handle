import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ColumnConfig } from '../models/column-config.model';

@Component({
  selector: 'app-item-column',
  standalone: true,
  imports: [
    NgClass,
    CdkDropList,
    CdkDragPlaceholder,
    CdkMenu,
    CdkMenuTrigger,
    CdkMenuItem,
    CdkMenuBar,
    MatButtonModule,
    MatIconModule,
    CdkDragHandle,
  ],
  templateUrl: './item-column.component.html',
  styleUrl: './item-column.component.scss',
  hostDirectives:[
    {
      directive: CdkDrag,
      inputs:[
        'cdkDragBoundary:"#boardDraggableContent"'
      ]
    }
  ]
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
