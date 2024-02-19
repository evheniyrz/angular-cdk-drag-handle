import { Component, ElementRef, EventEmitter, inject } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-poup-window',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
  hostDirectives: [
    {
      directive: CdkDrag,
      // inputs: ['cdkDragBoundary:".popup-parent"'],
    },
  ],
  outputs: ['destroyPopup'],
  templateUrl: './host-attached-directive.component.html',
  styleUrl: './host-attached-directive.component.scss',
})
export class HostAttachedDirectiveWindowComponent {
  event: EventEmitter<string> = new EventEmitter();
  expanded = false;
  private hostHTMLElement: HTMLElement = inject(ElementRef).nativeElement;
  destroyHost(): void {
    this.event.emit('close');
  }
  expandHostToggle(): void {
    this.expanded = !this.expanded;

    if (this.hostHTMLElement.classList.contains('full-screen')) {
      this.hostHTMLElement.classList.remove('full-screen');
      // this.sdkDragDirective.disabled = false;
    } else {
      this.hostHTMLElement.classList.add('full-screen');
      // this.sdkDragDirective.disabled = true;
    }
  }
  collapseHostToggle(): void {
    if (this.hostHTMLElement.classList.contains('collapsed')) {
      this.hostHTMLElement.classList.remove('collapsed');
      // this.sdkDragDirective.disabled = false;
    } else {
      this.hostHTMLElement.classList.add('collapsed');
      // this.sdkDragDirective.disabled = true;
    }
  }
}
