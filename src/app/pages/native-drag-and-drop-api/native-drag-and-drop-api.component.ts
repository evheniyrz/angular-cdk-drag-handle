import {
  AfterViewInit,
  Component,
  ElementRef,
  EnvironmentInjector,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import {
  dragEndHandler,
  dragOverSort,
  dragStartHandler,
  dropHandler,
} from '../drop-sorting-implementation/handlers';

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
  onDestroy$: any;

  ngAfterViewInit(): void {
    const itemCollection: HTMLCollection =
      this.sourceContainer.nativeElement.children;

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
    this.sourceContainer.nativeElement.removeEventListener(
      'dragstart',
      dragStartHandler
    );
    this.sourceContainer.nativeElement.removeEventListener(
      'dragover',
      dragOverSort
    );
    this.sourceContainer.nativeElement.removeEventListener(
      'drop',
      dropHandler,
      {
        capture: true,
      }
    );
    this.sourceContainer.nativeElement.removeEventListener(
      'dragend',
      dragEndHandler
    );

    this.targetContainer.nativeElement.removeEventListener(
      'dragstart',
      dragStartHandler
    );
    this.targetContainer.nativeElement.removeEventListener(
      'dragover',
      dragOverSort
    );
    this.targetContainer.nativeElement.removeEventListener('drop', dropHandler);
    this.targetContainer.nativeElement.removeEventListener(
      'dragend',
      dragEndHandler
    );
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
