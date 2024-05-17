import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/popup-window-caller/popup-window-caller.component').then(
        (c) => c.PopupWindowCallerComponent
      ),
  },
  // {
  //   path: 'element-attached',
  //   loadComponent: () =>
  //     import(
  //       './pages/element-attached-directive/element-attached-directive.component'
  //     ).then((c) => c.ElementAttachedDirectiveComponent),
  // },
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import(
  //       './pages/drop-sorting-implementation/drop-sorting-implementation.component'
  //     ).then((c) => c.DropSortingImplementationComponent),
  // },
  {
    path: 'native-dnd-api',
    loadComponent: () =>
      import(
        './pages/native-drag-and-drop-api/native-drag-and-drop-api.component'
      ).then((c) => c.NativeDragAndDropApiComponent),
  },
  {
    path: 'ag-grid',
    loadComponent: () =>
      import(
        './pages/ag-grid-tutorial/ag-grid-tutorial.component'
      ).then((c) => c.AgGridTutorialComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
