import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  Subject,
  fromEvent,
  fromEventPattern,
  pipe,
  takeUntil,
  tap,
} from 'rxjs';
import {
  dragEndHandler,
  dragOverSort,
  dragStartHandler,
  dropHandler,
} from './handlers';

@Component({
  selector: 'app-native-drag-and-drop-api',
  standalone: true,
  imports: [],
  templateUrl: './native-drag-and-drop-api.component.html',
  styleUrl: './native-drag-and-drop-api.component.scss',
})
export class NativeDragAndDropApiComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sourceContainer') sourceContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('targetContainer') targetContainer!: ElementRef<HTMLDivElement>;

  private onDestroy$: Subject<void> = new Subject();

  ngAfterViewInit(): void {
    const itemCollection: HTMLCollection = this.sourceContainer.nativeElement.children;

    for (const key in itemCollection) {
      if (Object.hasOwnProperty.call(itemCollection, key)) {
        const element = itemCollection[key];

        element.id = `${element.className}-${Number(key) + 1}`;
      }
    }
    this.sourceContainer.nativeElement.addEventListener(
      'dragstart',
      dragStartHandler
    );
    this.sourceContainer.nativeElement.addEventListener(
      'dragover',
      dragOverSort
    );
    this.sourceContainer.nativeElement.addEventListener('drop', dropHandler, {
      capture: true,
    });
    this.sourceContainer.nativeElement.addEventListener(
      'dragend',
      dragEndHandler
    );

    this.targetContainer.nativeElement.addEventListener(
      'dragstart',
      dragStartHandler
    );
    this.targetContainer.nativeElement.addEventListener(
      'dragover',
      dragOverSort
    );
    this.targetContainer.nativeElement.addEventListener('drop', dropHandler);
    this.targetContainer.nativeElement.addEventListener(
      'dragend',
      dragEndHandler
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
