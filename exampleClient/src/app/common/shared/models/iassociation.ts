import { IAssociationEntry } from './iassociationentry';
export interface IAssociation {
  manyToMany?: IAssociationEntry[];
  oneToMany?: IAssociationEntry[];
  manyToOne?: IAssociationEntry[];
  oneToOne?: IAssociationEntry[];
}
