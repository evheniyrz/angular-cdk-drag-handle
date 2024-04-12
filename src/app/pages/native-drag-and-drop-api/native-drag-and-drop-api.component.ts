import {
  AfterViewInit,
  Component,
  ElementRef,
  EnvironmentInjector,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';

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

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
