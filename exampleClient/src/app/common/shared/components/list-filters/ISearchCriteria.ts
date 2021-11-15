export enum operatorType {
  Contains = 'contains',
  Equals = 'equals',
  Range = 'range',
  NotEqual = 'notEqual',
}

export enum searchCase {
  Case1 = 1,
  Case2 = 2,
  Case3 = 3,
}

export interface ISearchCriteria {
  type: searchCase;
  value?: string;
  operator?: operatorType;
  fields?: ISearchField[];
}

export interface ISearchField {
  fieldName: any;
  searchValue?: string;
  startingValue?: string;
  endingValue?: string;
  operator: operatorType;
}
