import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordComponent } from './update-password.component';
import { TestingModule } from 'src/testing/utils';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ActivatedRoute } from '@angular/router';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
  let el: HTMLElement;

  let data = {
    oldPassword: 'oldPassword',
    newPassword: 'newPassword',
    confirmPassword: 'newPassword',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordComponent],
      imports: [TestingModule],
      providers: [AuthenticationService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
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
    expect(component.updatePasswordForm).toBeDefined();
  });

  it('should call updatePassword method and handle success response', async () => {
    component.updatePasswordForm.patchValue(data);
    component.updatePasswordForm.enable();
    fixture.detectChanges();

    spyOn(component.authenticationService, 'updatePassword').and.returnValue(of(true));
    el = fixture.debugElement.query(By.css('button[name=save]')).nativeElement;
    el.click();

    expect(component.authenticationService.updatePassword).toHaveBeenCalled();
    expect(component.passwordUpdated).toBe(true);
  });

  it('should call updatePassword method and handle error response', async () => {
    component.updatePasswordForm.patchValue(data);
    component.updatePasswordForm.enable();
    fixture.detectChanges();

    spyOn(component.authenticationService, 'updatePassword').and.callFake((token) => {
      return throwError('error occurred');
    });
    el = fixture.debugElement.query(By.css('button[name=save]')).nativeElement;
    el.click();

    expect(component.authenticationService.updatePassword).toHaveBeenCalled();
    expect(component.passwordUpdated).toBe(false);
    expect(component.disabled).toBe(false);
  });
});
