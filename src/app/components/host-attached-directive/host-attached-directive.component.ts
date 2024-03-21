import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, CdkDropListGroup, Point, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { ItemColumnComponent } from '../item-column/item-column.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { ColumnConfig } from '../models/column-config.model';
@Component({
  selector: 'app-poup-window',
  standalone: true,
  imports: [CdkDrag,
    AsyncPipe,
    NgTemplateOutlet,
    MatButtonModule,
    CdkDropList,
    CdkDropListGroup,
    MatIconModule, CdkDragHandle, ItemColumnComponent],
  hostDirectives: [
    {
      directive: CdkDrag,
      inputs:[
        'cdkDragBoundary:"body"' // doesn't work. see line:52 inside ngOninit method
      ]
    },
  ],
  outputs: ['destroyPopup'],
  templateUrl: './host-attached-directive.component.html',
  styleUrl: './host-attached-directive.component.scss',
})
export class HostAttachedDirectiveWindowComponent implements OnInit {
  event: EventEmitter<string> = new EventEmitter();
  expanded = false;
  columnConfigArray: Array<ColumnConfig> = Array.from({ length: 5 }, (_, index) => { return {colorLableValue:'green', title:`testDrive-${index + 1}`, description: `test drive#${index + 1}`, columnId: `testDrive-${index + 1}`}});

  private _hostHTMLElement: HTMLElement = inject(ElementRef).nativeElement;
  private _document: Document = inject(DOCUMENT);
  private _cdkDrag: CdkDrag = inject(CdkDrag);
  private _positionState: BehaviorSubject<Point> = new BehaviorSubject({
    x: 0,
    y: 0,
  });

  ngOnInit(): void {
 
    // this._cdkDrag.boundaryElement = 'body'; // !!!it works this way!!!

    const x: number =
      (this._document.body.clientWidth - this._hostHTMLElement.clientWidth) / 2;
    const y: number =
      (this._document.body.clientHeight - this._hostHTMLElement.clientHeight) /
      2;
    const point: Point = { x, y };
    this._cdkDrag.freeDragPosition = point;
  }

  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.columnConfigArray, event.previousIndex, event.currentIndex);
  }

  public destroyHost(): void {
    this.event.emit('close');
  }

  public hostFullScreenToggle(): void {
    this.expanded = !this.expanded;

    if (this._hostHTMLElement?.classList.contains('full-screen')) {
      this._hostHTMLElement?.classList.remove('full-screen');
    } else {
      this._hostHTMLElement?.classList.add('full-screen');
    }
  }

  public hostCollapseToggle(): void {
    if (this._hostHTMLElement?.classList.contains('collapsed')) {
      this._hostHTMLElement?.classList.remove('collapsed');
      this._cdkDrag.setFreeDragPosition(this._positionState.getValue());
    } else {
      this._hostHTMLElement?.classList.add('collapsed');

      this._positionState.next({
        ...this._cdkDrag.getFreeDragPosition(),
      });

      this._cdkDrag.setFreeDragPosition({
        x: 10,
        y: 0,
      });
    }
  }
}
