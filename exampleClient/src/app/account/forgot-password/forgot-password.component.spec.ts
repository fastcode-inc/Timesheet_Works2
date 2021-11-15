import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { TestingModule } from 'src/testing/utils';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [TestingModule],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInit', () => {
    component.ngOnInit();
    expect(component.resetForm).toBeDefined();
  });

  it('should call forgotPassword method and handle success response', async () => {
    component.resetForm.patchValue({ email: 'test@TestBed.com' });
    component.resetForm.enable();
    fixture.detectChanges();

    spyOn(component.authenticationService, 'forgotPassword').and.returnValue(of(true));
    el = fixture.debugElement.query(By.css('button[name=save]')).nativeElement;
    el.click();

    expect(component.authenticationService.forgotPassword).toHaveBeenCalled();
    expect(component.linkSent).toBe(true);
  });

  it('should call forgotPassword method and handle error response', async () => {
    component.resetForm.patchValue({ email: 'test@TestBed.com' });
    component.resetForm.enable();
    fixture.detectChanges();

    spyOn(component.authenticationService, 'forgotPassword').and.callFake((token) => {
      return throwError('error occurred');
    });
    el = fixture.debugElement.query(By.css('button[name=save]')).nativeElement;
    el.click();

    expect(component.authenticationService.forgotPassword).toHaveBeenCalled();
    expect(component.linkSent).toBe(false);
    expect(component.disabled).toBe(false);
  });
});
