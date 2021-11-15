export interface IUserspermission {
  permissionId: number;
  revoked?: boolean;
  usersId: number;

  permissionDescriptiveField?: string;
  usersDescriptiveField?: number;
}
