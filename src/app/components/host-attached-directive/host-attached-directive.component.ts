import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CdkDrag, CdkDragHandle, Point } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-poup-window',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
  hostDirectives: [
    {
      directive: CdkDrag,
      // inputs: ['cdkDragBoundary:""'],
    },
  ],
  outputs: ['destroyPopup'],
  templateUrl: './host-attached-directive.component.html',
  styleUrl: './host-attached-directive.component.scss',
})
export class HostAttachedDirectiveWindowComponent implements OnInit {
  event: EventEmitter<string> = new EventEmitter();
  expanded = false;

  private _hostHTMLElement: HTMLElement = inject(ElementRef).nativeElement;
  private _document: Document = inject(DOCUMENT);
  private _cdkDrag: CdkDrag = inject(CdkDrag);

  ngOnInit(): void {
    this._cdkDrag.boundaryElement = this._document.body;
    const x: number =
      (this._document.body.clientWidth - this._hostHTMLElement.clientWidth) / 2;
    const y: number =
      (this._document.body.clientHeight - this._hostHTMLElement.clientHeight) /
      2;
    const point: Point = { x, y };
    this._cdkDrag.freeDragPosition = point;
  }

  public destroyHost(): void {
    this.event.emit('close');
  }

  public hostFullScreenToggle(): void {
    this.expanded = !this.expanded;

    if (this._hostHTMLElement.classList.contains('full-screen')) {
      this._hostHTMLElement.classList.remove('full-screen');
      // this.sdkDragDirective.disabled = false;
    } else {
      this._hostHTMLElement.classList.add('full-screen');
      // this.sdkDragDirective.disabled = true;
    }
  }

  public hostCollapseToggle(): void {
    if (this._hostHTMLElement.classList.contains('collapsed')) {
      this._hostHTMLElement.classList.remove('collapsed');
      // this.sdkDragDirective.disabled = false;
    } else {
      this._hostHTMLElement.classList.add('collapsed');
      // this.sdkDragDirective.disabled = true;
    }
  }
}
