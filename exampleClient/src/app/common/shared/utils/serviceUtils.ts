import { ISearchField, operatorType } from '../components/list-filters/ISearchCriteria';
import { AssociationColumn } from 'src/app/common/shared/models/association-column.interface';

export class ServiceUtils {
  /**
   * Parses the list of SearchFiels into
   * a predefined string format.
   * Default format: 'field1[operatorType]=searchText1;field2[operatorType]=searchText2'
   * @param searchFields
   * @returns Parsed string.
   */
  public static parseSearchFields(searchFields?: ISearchField[]): string {
    let searchString: string = '';
    console.log(searchFields);
    if (searchFields !== null && searchFields !== undefined) {
      searchFields.forEach((field) => {
        searchString += `${field.fieldName}[${field.operator}]=`;

        let searchValue: any = field.searchValue;
        let startingValue: any = field.startingValue;
        let endingValue: any = field.endingValue;

        if (field.operator === operatorType.Range) {
          if (startingValue !== null) {
            searchString += startingValue;
          }
          searchString += ',';
          if (endingValue !== null) {
            searchString += endingValue;
          }
        } else {
          if (searchValue !== null) {
            searchString += searchValue;
          }
        }
        searchString += ';';
      });
      if (searchString.length > 0) {
        searchString = searchString.slice(0, -1);
      }
    }

    return searchString;
  }

  /**
   * Builds params object against given criteria.
   * @param searchFields List of SearchFields.
   * @param offset Items to be skipped.
   * @param limit Maximum no. of items.
   * @param sort Field and direction information for sorting.
   * @returns Params object.
   */
  public static buildQueryData(searchFields?: ISearchField[], offset?: any, limit?: any, sort?: string): any {
    let params = {
      search: this.parseSearchFields(searchFields),
      offset: offset ? offset : 0,
      limit: limit ? limit : 10,
      sort: sort ? sort : '',
    };

    return params;
  }

  /**
   * Parses given list of columns into
   * predefined string format.
   * Default format: 'key1:value1,key2:value2'
   * @param ids List of association columns.
   * @returns Parsed string.
   */
  public static encodeId(ids: AssociationColumn[]): string {
    let idString: string = '';

    if (ids.length > 1) {
      ids.forEach((id) => {
        idString += `${id.referencedkey}=${id.value},`;
      });
      if (idString.length > 0) {
        idString = idString.slice(0, -1);
      }
    } else if (ids.length == 1) {
      idString = ids[0].value;
    }

    return idString;
  }

  /**
   * Gets values of given keys from given objects
   * and constructs a predefined id string
   * @param obj
   * @param ids List of keys.
   * @returns Parsed string.
   */
  public static encodeIdByObject(obj: any, ids: string[]): string {
    let idString: string = '';

    if (ids.length > 1) {
      ids.forEach((id) => {
        idString += `${id}=${obj[id]},`;
      });
      if (idString.length > 0) {
        idString = idString.slice(0, -1);
      }
    } else if (ids.length == 1) {
      idString = obj[ids[0]];
    }

    return idString;
  }
}
