import { Component } from '@angular/core';
import { DROP_ITEM_LIST, DropItem } from './drop-item-list';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-sorting-implementation',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './drop-sorting-implementation.component.html',
  styleUrl: './drop-sorting-implementation.component.scss',
})
export class DropSortingImplementationComponent {
  public itemList: DropItem[] = DROP_ITEM_LIST;

  dropColumn(event: CdkDragDrop<DropItem>): void {}
  dropTarget(event: CdkDragDrop<DropItem>): void {}
}
