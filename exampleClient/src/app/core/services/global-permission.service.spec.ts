import { TestBed } from '@angular/core/testing';

import { GlobalPermissionService } from './global-permission.service';
import { ITokenDetail } from 'src/app/core/models/itoken-detail';
import { AuthenticationService } from './authentication.service';
import { AuthenticationServiceMock } from 'src/testing/mocks';

describe('global permission service', () => {
  let tokenDetails: ITokenDetail = {
    exp: '123',
    scopes: ['samplePermission'],
    sub: 'sub',
  };

  var service: GlobalPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalPermissionService, { provide: AuthenticationService, useClass: AuthenticationServiceMock }],
      declarations: [],
      imports: [],
    });
    service = TestBed.inject(GlobalPermissionService);
  });

  it('hasPermission should return true if token exists and permission exists in scopes', () => {
    spyOn(service.authService, 'decodeToken').and.returnValue(tokenDetails);
    expect(service.hasPermission('samplePermission')).toBe(true);
  });

  it('hasPermission should return false if token exists and permission does not exist in scopes', () => {
    spyOn(service.authService, 'decodeToken').and.returnValue(tokenDetails);
    expect(service.hasPermission('samplePermission2')).toBe(false);
  });

  it('hasPermission should return false if token is not defined', () => {
    spyOn(service.authService, 'decodeToken').and.returnValue({});
    expect(service.hasPermission('samplePermission')).toBe(false);
  });

  it('hasPermissionOnEntity should return false if entity is not defined', () => {
    spyOn(service.authService, 'decodeToken').and.returnValue({});
    expect(service.hasPermissionOnEntity(null, 'READ')).toBe(false);
  });

  it('hasPermissionOnEntity should call hasPermission', () => {
    spyOn(service.authService, 'decodeToken').and.returnValue(tokenDetails);
    spyOn(service, 'hasPermission').and.returnValue(true);
    service.hasPermissionOnEntity('dummy', 'READ');
    expect(service.hasPermission).toHaveBeenCalledWith('DUMMYENTITY_READ');
  });
});
