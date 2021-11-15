import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVariableListComponent } from './email-variable-list.component';

describe('RolesComponent', () => {
  let component: EmailVariableListComponent;
  let fixture: ComponentFixture<EmailVariableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVariableListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVariableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
