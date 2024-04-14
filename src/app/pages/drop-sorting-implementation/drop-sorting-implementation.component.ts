import { Component, ViewChild, inject } from '@angular/core';
import { DROP_ITEM_LIST, DropItem } from './drop-item-list';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-sorting-implementation',
  standalone: true,
  imports: [ CdkDrag, CdkDropList, CdkDropListGroup],
  templateUrl: './drop-sorting-implementation.component.html',
  styleUrl: './drop-sorting-implementation.component.scss',
  providers:[CdkDrag]
})
export class DropSortingImplementationComponent {
  public itemList: DropItem[] = DROP_ITEM_LIST;
  public targetItems: DropItem[] =[];
// constructor(private cdkDrag: CdkDrag){}
  private cdkDrag: CdkDrag = inject(CdkDrag); ///**** HERE*** */

  // @ViewChild(CdkDrag, { read: CdkDrag })
  // cdkDragRef!: CdkDrag;

  drop(event: CdkDragDrop<DropItem[]>): void {
    if (event.container === event.previousContainer) {
      console.log('IN SAME', { 
        crr: event.currentIndex, // with multiline content - index is incorrect
        prev: event.previousIndex, // with multiline content - index is incorrect
        dr: this.cdkDrag 
      });
    
    }
  }
  dropTarget(event: CdkDragDrop<DropItem[]>): void {}
}
