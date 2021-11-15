import { Observable } from 'rxjs';
export interface IFCDialogConfig {
  DataSource: Observable<any>;
  Title: string;
  IsSingleSelection?: boolean;
  DisplayField: string;
  selectedList: Array<number>;
  //OnClose: Observable<any>;
}
