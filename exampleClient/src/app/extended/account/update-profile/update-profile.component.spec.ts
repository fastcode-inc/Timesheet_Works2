import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TestingModule } from 'src/testing/utils';
import { UsersExtendedService } from 'src/app/extended/admin/user-management/users';
import { UpdateProfileExtendedComponent } from './update-profile.component';
import { DateUtils } from 'src/app/common/shared';

describe('UpdateProfileExtendedComponent', () => {
  let component: UpdateProfileExtendedComponent;
  let fixture: ComponentFixture<UpdateProfileExtendedComponent>;
  let el: HTMLElement;

  let d = new Date();
  let t = DateUtils.formatDateStringToAMPM(d);
  let data = {
    username: 'username',
    emailaddress: 'emailAddress1@test.com',
  };

  describe('Unit Tests', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [UpdateProfileExtendedComponent],
        imports: [TestingModule],
        providers: [UsersExtendedService],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(UpdateProfileExtendedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  });
});
