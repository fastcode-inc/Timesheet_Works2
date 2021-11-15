// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input } from '@angular/core';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Component, Directive, ChangeDetectorRef } from '@angular/core';
import { EmailTemplateListComponent as List } from './email-template-list.component';
import { PickerComponent } from '../picker/picker.component';

import { EmailTemplateService as Service } from './email-template.service';
import { IEmailTemplate as IITem } from './iemail-template';
import { TestingModule } from '../../testing/utils';

import { environment } from '../../environments/environment';
import { UserNewComponent } from '../users';

@Injectable()
class MockRouter {
  navigate = () => {};
}

@Injectable()
class MockGlobals {}

@Injectable()
class MockPermissionService {}

@Injectable()
class MockPickerDialogService {}
@Directive({
  selector: '[routerlink]',
  host: { '(click)': 'onClick()' },
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
describe('EmailTemplateListComponent', () => {
  let fixture: ComponentFixture<List>;
  let component: List;
  let data: IITem[] = [
    {
      id: 1,
      templateName: 'name1',
      category: 'category1',
      contentHtml: 'html',
      contentJson: 'json',
      to: 'to',
      cc: '',
      bcc: 'bcc',
      subject: 'subject',
    },
    {
      id: 2,
      templateName: 'name2',
      category: 'category2',
      contentHtml: 'html2',
      contentJson: 'json2',
      to: 'to2',
      cc: '',
      bcc: 'bcc2',
      subject: 'subject2',
    },
  ];

  let httpTestingController: HttpTestingController;
  let service: Service;
  let baseUrl: string = environment.apiUrl;
  let mockGlobal = {
    isSmallDevice$: of({ value: true }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [List, UserNewComponent, PickerComponent],
      imports: [TestingModule],
      providers: [Service, ChangeDetectorRef],

      //  schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents(); /*.then(()=> {
      fixture = TestBed.createComponent(PermissionListComponent);
      httpTestingController = TestBed.get(HttpTestingController);
      permissionService = TestBed.get(PermissionService);
      component = fixture.debugElement.componentInstance;
      

    })*/
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(List);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(Service);
    component = fixture.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
    //expect(2).toBeGreaterThan(3);
    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController);
    // permissionService = TestBed.get(PermissionService);
    //permissionService.getAll('').subscribe();
    const req = httpTestingController.expectOne(baseUrl + '/emailtemplates').flush(data);
    // req.flush(data);
    // fixture.detectChanges();
    expect(component.emailtemplates.length).toEqual(2);
    httpTestingController.verify();
  });

  it('should a list of permissions', async () => {
    // const result = component.ngOnInit();
    //expect(2).toBeGreaterThan(3);
    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController);
    // permissionService = TestBed.get(PermissionService);
    //permissionService.getAll('').subscribe();
    const req = httpTestingController.expectOne(baseUrl + '/permissions').flush(data);
    // req.flush(data);
    expect(component.emailtemplates.length).toEqual(data.length);
    fixture.detectChanges();

    //   expect(fixture.debugElement.queryAll(By.directive(MatRow)).length).toEqual(2);
    //expect(fixture.debugElement.queryAll(By.css('.mat-row')).length).toEqual(2);

    httpTestingController.verify();
  });
  it('should run #onAdd()', async () => {
    // const result = component.onAdd();
    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController);
    // permissionService = TestBed.get(PermissionService);
    //permissionService.getAll('').subscribe();
    const result = component.onAdd();
    const req = httpTestingController.expectOne(baseUrl + '/permissions').flush(data);
    // req.flush(data);
    fixture.detectChanges();

    //   expect(fixture.debugElement.queryAll(By.directive(MatRow)).length).toEqual(2);
    //expect(fixture.debugElement.queryAll(By.css('.mat-row')).length).toEqual(2);

    // httpTestingController.verify()
  });

  it('should run #delete()', async () => {
    // const result = component.delete(item);
    // const result = component.onAdd();
    fixture.detectChanges();
    httpTestingController = TestBed.get(HttpTestingController);
    // permissionService = TestBed.get(PermissionService);
    //permissionService.getAll('').subscribe();

    const req = httpTestingController.expectOne(baseUrl + '/permissions').flush(data);
    // req.flush(data);
    const result = component.delete(data[0]);
    const req2 = httpTestingController.expectOne(baseUrl + '/permissions/' + data[0].id).flush(data[0]);
    expect(component.emailtemplates.length).toEqual(1);
    fixture.detectChanges();

    //   expect(fixture.debugElement.queryAll(By.directive(MatRow)).length).toEqual(2);
    //expect(fixture.debugElement.queryAll(By.css('.mat-row')).length).toEqual(2);

    // httpTestingController.verify()
  });
});
