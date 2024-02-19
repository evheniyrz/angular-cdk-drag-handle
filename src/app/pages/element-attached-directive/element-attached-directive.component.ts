import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-element-attached-directive',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
  templateUrl: './element-attached-directive.component.html',
  styleUrl: './element-attached-directive.component.scss',
})
export class ElementAttachedDirectiveComponent {}
