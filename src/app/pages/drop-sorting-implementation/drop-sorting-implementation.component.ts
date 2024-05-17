import { Component, ViewChild, inject } from '@angular/core';
import { DROP_ITEM_LIST, DropItem } from './drop-item-list';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-sorting-implementation',
  standalone: true,
  imports: [ CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './drop-sorting-implementation.component.html',
  styleUrl: './drop-sorting-implementation.component.scss',
  providers:[]
})
export class DropSortingImplementationComponent {
  public itemList: DropItem[] = DROP_ITEM_LIST;
  public targetItems: DropItem[] =[];

  drop(event: CdkDragDrop<DropItem[]>): void {
  }
  dropTarget(event: CdkDragDrop<DropItem[]>): void {}
}
