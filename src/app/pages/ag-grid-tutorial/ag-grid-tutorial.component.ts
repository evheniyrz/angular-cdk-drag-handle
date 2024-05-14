import { Component } from '@angular/core';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-ag-grid-tutorial',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './ag-grid-tutorial.component.html',
  styleUrl: './ag-grid-tutorial.component.scss'
})
export class AgGridTutorialComponent {

}
