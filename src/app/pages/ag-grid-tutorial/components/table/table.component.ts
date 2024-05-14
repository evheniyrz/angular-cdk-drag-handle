import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular],
  template: `
  <ag-grid-angular
  style="height: 300px;"
  [class]="themeClass"
   [rowData]="rowData"
   [columnDefs]="colDefs">
 </ag-grid-angular>`,
  styleUrl: './table.component.scss'
})
export class TableComponent {
  public themeClass: string =
    "ag-theme-quartz-dark";
  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "MAZ", model: "Sybibir", price: 29600, electric: false },
  ];
 
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: "make", checkboxSelection: true, },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];
}
