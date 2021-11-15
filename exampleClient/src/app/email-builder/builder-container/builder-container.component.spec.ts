import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderContainerComponent } from './builder-container.component';

describe('BuilderContainerComponent', () => {
  let component: BuilderContainerComponent;
  let fixture: ComponentFixture<BuilderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BuilderContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
