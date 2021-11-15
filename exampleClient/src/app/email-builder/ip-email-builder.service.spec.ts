import { TestBed, inject } from '@angular/core/testing';

import { IpEmailBuilderService } from './ip-email-builder.service';

describe('IpEmailBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpEmailBuilderService],
    });
  });

  it('should be created', inject([IpEmailBuilderService], (service: IpEmailBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
