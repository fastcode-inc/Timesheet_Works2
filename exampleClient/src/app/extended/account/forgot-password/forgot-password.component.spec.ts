import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordExtendedComponent } from './forgot-password.component';
import { TestingModule } from 'src/testing/utils';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

describe('ForgotPasswordExtendedComponent', () => {
  let component: ForgotPasswordExtendedComponent;
  let fixture: ComponentFixture<ForgotPasswordExtendedComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordExtendedComponent],
      imports: [TestingModule],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
