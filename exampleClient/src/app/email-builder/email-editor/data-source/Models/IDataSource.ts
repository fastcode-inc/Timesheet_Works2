import { IEmailTemplate } from '../../..//email-editor/iemail-template';
import { IDataSourceMeta } from '../../..//email-editor/data-source/Models/DataSourceMeta';

export interface IDataSource {
  id: number;
  name: string;
  emailTemplate: IEmailTemplate;
  sqlQuery: string;
  creation: string;
  metaList: IDataSourceMeta[];
  readOnlyQuery: boolean;
}
