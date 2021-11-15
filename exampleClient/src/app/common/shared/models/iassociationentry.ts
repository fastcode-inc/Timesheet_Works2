import { AssociationColumn } from './association-column.interface';
import { ISearchField } from '../components/list-filters/ISearchCriteria';
import { GenericApiService } from '../base/generic-api.service';
export interface IAssociationEntry {
  column: AssociationColumn[];
  table?: string;
  isParent?: boolean;
  service?: GenericApiService<any>;
  data?: any;
  type?: string;
  descriptiveField?: any;
  referencedDescriptiveField?: string;
  associatedObj?: any;
  associatedPrimaryKeys?: string[];
  searchValue?: ISearchField[];
  url?: string;
  listColumn?: string;
  label?: string;
}
