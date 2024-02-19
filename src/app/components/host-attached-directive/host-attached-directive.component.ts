import { Component, EventEmitter } from '@angular/core';
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
  destroyHost(): void {
    this.event.emit('close');
  }
  expandHostToggle(): void {}
  collapseHostToggle(): void {}
}
