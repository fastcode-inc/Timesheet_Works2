import { GlobalPermissionService } from 'src/app/core/services/global-permission.service';
import { ITokenDetail } from 'src/app/core/models/itoken-detail';

export interface ILibraryRootConfg {
  xApiKey: string;
  apiPath?: string;
  decodedAccessToken?: ITokenDetail;
  permissionService?: GlobalPermissionService;
}
