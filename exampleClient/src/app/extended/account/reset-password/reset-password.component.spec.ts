import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordExtendedComponent } from './reset-password.component';
import { TestingModule } from 'src/testing/utils';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

describe('ResetPasswordExtendedComponent', () => {
  let component: ResetPasswordExtendedComponent;
  let fixture: ComponentFixture<ResetPasswordExtendedComponent>;
  let el: HTMLElement;

  let data = {
    password: 'testPassword',
    confirmPassword: 'testPassword',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordExtendedComponent],
      imports: [TestingModule],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
