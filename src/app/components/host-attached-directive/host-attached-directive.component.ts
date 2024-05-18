import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  Point,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { AsyncPipe, DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { ItemColumnComponent } from '../item-column/item-column.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ColumnConfig } from '../models/column-config.model';
import { PositionState } from './position-state.model';
@Component({
  selector: 'app-poup-window',
  standalone: true,
  imports: [
    CdkDrag,
    AsyncPipe,
    NgTemplateOutlet,
    MatButtonModule,
    CdkDropList,
    CdkDropListGroup,
    MatIconModule,
    CdkDragHandle,
    ItemColumnComponent,
  ],
  hostDirectives: [
    {
      directive: CdkDrag,
      inputs: ['cdkDragBoundary'],
    },
  ],
  outputs: ['destroyPopup'],
  templateUrl: './host-attached-directive.component.html',
  styleUrl: './host-attached-directive.component.scss',
})
export class HostAttachedDirectiveWindowComponent implements OnInit {
  event: EventEmitter<string> = new EventEmitter();
  expanded = false;
  columnConfigArray: Array<ColumnConfig> = Array.from(
    { length: 5 },
    (_, index) => {
      return {
        colorLableValue: 'green',
        title: `testDrive-${index + 1}`,
        description: `test drive#${index + 1}`,
        columnId: `testDrive-${index + 1}`,
      };
    }
  );

  private _hostHTMLElement: HTMLElement = inject(ElementRef).nativeElement;
  private _document: Document = inject(DOCUMENT);
  private _cdkDrag: CdkDrag = inject(CdkDrag);

  private _positionState: WritableSignal<PositionState> = signal({
    prev: {
      x: 0,
      y: 0,
    },
    cur: {
      x: 0,
      y: 0,
    },
  });

  constructor() {
    effect(() => {
      console.log('EFFECT RUNNING');
      // issue with current and previouse value for dragPosition in "hostCollapseToggle" handler
      this._cdkDrag.setFreeDragPosition(this._positionState().cur);
    });
  }
  ngOnInit(): void {
    this._cdkDrag.boundaryElement = 'body';
    // get boundary element to set bottom/top collapsed position
    const initialPoint: Point = this.getInitialPosition();
    this._positionState.set({
      prev: initialPoint,
      cur: initialPoint,
    });
  }

  dropColumn(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.columnConfigArray,
      event.previousIndex,
      event.currentIndex
    );
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
      this._positionState.update((val) => ({
        ...val,
        cur: val.prev,
      }));
    } else {
      this._hostHTMLElement?.classList.add('collapsed');
      this.setCollapsedpositiion();
    }
  }

  private getInitialPosition(): Point {
    let initialPoint: Point = { x: 0, y: 0 };
    const parentElement: HTMLElement | null =
      this._hostHTMLElement.parentElement;
    if (parentElement) {
      const x: number =
        (this._document.body.clientWidth - this._hostHTMLElement.clientWidth) /
          2 -
        parentElement.offsetLeft;
      const y: number =
        (this._document.body.clientHeight -
          this._hostHTMLElement.clientHeight) /
          2 -
        parentElement.offsetTop;
      initialPoint = { x, y };
    }
    return initialPoint;
  }
  // WIP *** WIP *** WIP
  // incorrect restored position
  private setCollapsedpositiion(): void {
    const parentElement: HTMLElement | null =
      this._hostHTMLElement.parentElement;
    const currposition: Point = this._cdkDrag.getFreeDragPosition();

    const positionState: PositionState = {
      prev: currposition,
      cur: currposition,
    };

    if (parentElement) {
      positionState.cur.y =
        this._document.body.clientHeight -
        parentElement.offsetTop -
        this._hostHTMLElement.clientHeight;
    }
    console.log('incorrect restored position', {
      parentElement,
      y: positionState,
    });
    this._positionState.set(positionState);
  }
}
