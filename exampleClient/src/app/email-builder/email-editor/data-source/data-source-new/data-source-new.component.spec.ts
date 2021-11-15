import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceNewComponent } from './data-source-new.component';

describe('DataSourceNewComponent', () => {
  let component: DataSourceNewComponent;
  let fixture: ComponentFixture<DataSourceNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataSourceNewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
