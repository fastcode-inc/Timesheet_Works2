import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwaggerComponent } from './swagger.component';
import { TestingModule } from 'src/testing/utils';

describe('SwaggerComponent', () => {
  let component: SwaggerComponent;
  let fixture: ComponentFixture<SwaggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SwaggerComponent],
      imports: [TestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
