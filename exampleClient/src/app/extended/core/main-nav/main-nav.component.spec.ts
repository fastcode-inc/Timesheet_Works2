import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatExpansionModule } from '@angular/material/expansion';
import { MainNavExtendedComponent } from './main-nav.component';
import { TestingModule, EntryComponents } from 'src/testing/utils';

xdescribe('MainNavExtendedComponent', () => {
  let component: MainNavExtendedComponent;
  let fixture: ComponentFixture<MainNavExtendedComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, MatSidenavModule, MatExpansionModule],
      declarations: [MainNavExtendedComponent].concat(EntryComponents),
    }).compileComponents();

    fixture = TestBed.createComponent(MainNavExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
