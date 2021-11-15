import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { TestingModule } from 'src/testing/utils';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let el: HTMLElement;

  let data = {
    password: 'testPassword',
    confirmPassword: 'testPassword',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [TestingModule],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInit', () => {
    const aroutes = TestBed.inject(ActivatedRoute);
    aroutes.snapshot.queryParams['token'] = 'sampleToken';
    component.ngOnInit();
    expect(component.resetForm).toBeDefined();
  });

  it('should call resetPassword method and handle success response', async () => {
    component.resetToken = 'testToken';
    component.resetForm.patchValue(data);
    component.resetForm.enable();
    fixture.detectChanges();

    spyOn(component.authenticationService, 'resetPassword').and.returnValue(of(true));
    el = fixture.debugElement.query(By.css('button[name=save]')).nativeElement;
    el.click();

    expect(component.authenticationService.resetPassword).toHaveBeenCalled();
    expect(component.passwordUpdated).toBe(true);
  });

  it('should call resetPassword method and handle error response', async () => {
    component.resetToken = 'testToken';
    component.resetForm.patchValue(data);
    component.resetForm.enable();
    fixture.detectChanges();

    spyOn(component.authenticationService, 'resetPassword').and.callFake((token) => {
      return throwError('error occurred');
    });
    el = fixture.debugElement.query(By.css('button[name=save]')).nativeElement;
    el.click();

    expect(component.authenticationService.resetPassword).toHaveBeenCalled();
    expect(component.passwordUpdated).toBe(false);
    expect(component.disabled).toBe(false);
  });
});
