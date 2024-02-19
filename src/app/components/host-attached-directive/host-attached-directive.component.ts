import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
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

  private hostHTMLElement: HTMLElement = inject(ElementRef).nativeElement;
  private _document: Document = inject(DOCUMENT);
  private _cdkDrag: CdkDrag = inject(CdkDrag);

  ngOnInit(): void {
    this._cdkDrag.boundaryElement = this._document.body;
  }

  public destroyHost(): void {
    this.event.emit('close');
  }

  public hostFullScreenToggle(): void {
    this.expanded = !this.expanded;

    if (this.hostHTMLElement.classList.contains('full-screen')) {
      this.hostHTMLElement.classList.remove('full-screen');
      // this.sdkDragDirective.disabled = false;
    } else {
      this.hostHTMLElement.classList.add('full-screen');
      // this.sdkDragDirective.disabled = true;
    }
  }

  public hostCollapseToggle(): void {
    if (this.hostHTMLElement.classList.contains('collapsed')) {
      this.hostHTMLElement.classList.remove('collapsed');
      // this.sdkDragDirective.disabled = false;
    } else {
      this.hostHTMLElement.classList.add('collapsed');
      // this.sdkDragDirective.disabled = true;
    }
  }
}
