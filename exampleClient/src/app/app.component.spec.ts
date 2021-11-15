import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestingModule } from 'src/testing/utils';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const fontData: any = {
    items: [
      {
        family: 'font1',
      },
      {
        family: 'font2',
      },
    ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [TestingModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should call getFontfamily', async(() => {
    spyOn(component.appService, 'getFontFamily').and.returnValue(of(fontData));
    spyOn(component, 'appendLink').and.returnValue();

    component.getFontFamily();
    fixture.detectChanges();
    expect(component.appendLink).toHaveBeenCalledWith('font1|font2');
  }));

  it('should add link in head element', async(() => {
    let fontFamily = 'testFamily';
    component.appendLink(fontFamily);
    fixture.detectChanges();
    let headID = document.getElementsByTagName('head')[0];
    let links: any = headID.getElementsByTagName('link');
    let exists = false;
    for (let i = 0; i < links.length; i++) {
      if (
        links.item(i)?.attributes['type']?.value == 'text/css' &&
        links.item(i)?.attributes['rel']?.value == 'stylesheet' &&
        links.item(i)?.attributes['href']?.value == `https://fonts.googleapis.com/css?family=${fontFamily}:300,400,500`
      ) {
        exists = true;
        break;
      }
    }
    expect(exists).toBe(true);
  }));
});
