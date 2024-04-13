import { Component, ViewChild, inject } from '@angular/core';
import { DROP_ITEM_LIST, DropItem } from './drop-item-list';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-sorting-implementation',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './drop-sorting-implementation.component.html',
  styleUrl: './drop-sorting-implementation.component.scss',
  providers:[CdkDrag]
})
export class DropSortingImplementationComponent {
  public itemList: DropItem[] = DROP_ITEM_LIST;

  private cdkDrag: CdkDrag = inject(CdkDrag);

  // @ViewChild('cdkDragRef', { read: CdkDrag })
  // cdkDragRef!: CdkDrag;

  drop(event: CdkDragDrop<DropItem[]>): void {
    if (event.container === event.previousContainer) {
      console.log('IN SAME', { crr: event.currentIndex, prev: event.previousIndex, dr: this.cdkDrag });
    
    }
  }
  dropTarget(event: CdkDragDrop<DropItem>): void {}
}
