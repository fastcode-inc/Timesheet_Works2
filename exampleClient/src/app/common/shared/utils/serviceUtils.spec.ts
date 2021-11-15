import { ServiceUtils } from './serviceUtils';
import { ISearchField, operatorType } from '../components/list-filters/ISearchCriteria';
import { AssociationColumn } from '../models/association-column.interface';

describe('serviceUtils', () => {
  it('should encode id with multiple columns', () => {
    let columns: AssociationColumn[] = [
      {
        key: 'parentId',
        referencedkey: 'id',
        value: '1',
      },
      {
        key: 'parentId2',
        referencedkey: 'id2',
        value: '2',
      },
    ];

    expect(['id=1,id2=2', 'id2=2,id=1']).toContain(ServiceUtils.encodeId(columns));
  });

  it('should encode id with single column', () => {
    let columns: AssociationColumn[] = [
      {
        key: 'parentId',
        referencedkey: 'id',
        value: '1',
      },
    ];

    expect('1').toBe(ServiceUtils.encodeId([columns[0]]));
  });

  it('should encode id by object with multiple primary keys', () => {
    let obj = {
      id: '1',
      id2: '2',
    };
    let ids: string[] = ['id', 'id2'];

    expect(['id=1,id2=2', 'id2=2,id=1']).toContain(ServiceUtils.encodeIdByObject(obj, ids));
  });

  it('should encode id by object with single primary key', () => {
    let obj = {
      id: '1',
      name: 'name1',
    };
    let ids: string[] = ['id'];

    expect('1').toBe(ServiceUtils.encodeIdByObject(obj, ids));
  });

  it('should build query data with all params', () => {
    spyOn(ServiceUtils, 'parseSearchFields').and.returnValue('sampleSearchString');
    let sampleQueryData = {
      search: 'sampleSearchString',
      offset: 10,
      limit: 10,
      sort: 'id,asc',
    };
    let queryData = ServiceUtils.buildQueryData(
      [],
      sampleQueryData.offset,
      sampleQueryData.limit,
      sampleQueryData.sort
    );
    expect(queryData).toEqual(sampleQueryData);
  });

  it('should build query data with search fields only', () => {
    spyOn(ServiceUtils, 'parseSearchFields').and.returnValue('sampleSearchString');
    let sampleQueryData = {
      search: 'sampleSearchString',
      offset: 0,
      limit: 10,
      sort: '',
    };
    let queryData = ServiceUtils.buildQueryData([]);
    expect(queryData).toEqual(sampleQueryData);
  });

  it('should parse search fields for multiple fields', () => {
    let searchFields: ISearchField[] = [
      {
        fieldName: 'title',
        operator: operatorType.Equals,
        searchValue: 'searchText',
      },
      {
        fieldName: 'details',
        operator: operatorType.Contains,
        searchValue: 'searchTextDetails',
      },
    ];
    let sampleParsedString1: string = `title[${operatorType.Equals}]=searchText;details[${operatorType.Contains}]=searchTextDetails`;
    let sampleParsedString2: string = `details[${operatorType.Contains}]=searchTextDetails;title[${operatorType.Equals}]=searchText`;
    let response: string = ServiceUtils.parseSearchFields(searchFields);
    expect([sampleParsedString1, sampleParsedString2]).toContain(response);
  });

  it('should parse search fields for a single', () => {
    let searchFields: ISearchField[] = [
      {
        fieldName: 'title',
        operator: operatorType.Equals,
        searchValue: 'searchText',
      },
    ];
    let sampleParsedString: string = `title[${operatorType.Equals}]=searchText`;
    let response: string = ServiceUtils.parseSearchFields(searchFields);
    expect(sampleParsedString).toEqual(response);
  });

  it('should parse search fields with range operator', () => {
    let searchFields: ISearchField[] = [
      {
        fieldName: 'count',
        operator: operatorType.Range,
        startingValue: '1',
        endingValue: '3',
      },
    ];
    let sampleParsedString: string = `count[${operatorType.Range}]=1,3`;
    let response: string = ServiceUtils.parseSearchFields(searchFields);
    expect(sampleParsedString).toEqual(response);
  });
});
