import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordExtendedComponent } from './update-password.component';
import { TestingModule } from 'src/testing/utils';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

describe('UpdatePasswordExtendedComponent', () => {
  let component: UpdatePasswordExtendedComponent;
  let fixture: ComponentFixture<UpdatePasswordExtendedComponent>;
  let el: HTMLElement;

  let data = {
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
    confirmPassword: 'newPassword',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordExtendedComponent],
      imports: [TestingModule],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
