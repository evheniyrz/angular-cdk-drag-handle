type LabelColor = 'green' | ' grey' | 'blue' | 'purple' | 'orange';
export interface ColumnConfig  {
    colorLableValue: LabelColor;
    title:string; 
    description: string; 
    columnId: string;
}