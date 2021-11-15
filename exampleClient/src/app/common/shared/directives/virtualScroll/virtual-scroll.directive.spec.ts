import { VirtualScrollDirective } from './virtual-scroll.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<ul type="text" appVirtualScroll></ul>`,
})
class TestVirtualScrollComponent {}
describe('VirtualScrollDirective', () => {
  let component: TestVirtualScrollComponent;
  let fixture: ComponentFixture<TestVirtualScrollComponent>;
  let inputEl: DebugElement;
  let directive: VirtualScrollDirective;
  let scrollEventEmitterSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestVirtualScrollComponent, VirtualScrollDirective],
    });
    fixture = TestBed.createComponent(TestVirtualScrollComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(VirtualScrollDirective));
    directive = new VirtualScrollDirective(inputEl);
    scrollEventEmitterSpy = spyOn(directive.onScroll, 'emit').and.callThrough();
  });

  it('should emit scroll event', () => {
    let e = {
      target: {
        offsetHeight: 250,
        scrollHeight: 300,
        scrollTop: 50,
      },
    };

    inputEl.triggerEventHandler('scroll', e);
    directive.scrollEventHandler(e);
    fixture.detectChanges();
    expect(scrollEventEmitterSpy).toHaveBeenCalled();
  });

  it('should not emit scroll event', () => {
    let e = {
      target: {
        offsetHeight: 200,
        scrollHeight: 350,
        scrollTop: 50,
      },
    };

    inputEl.triggerEventHandler('scroll', e);
    directive.scrollEventHandler(e);
    fixture.detectChanges();
    expect(scrollEventEmitterSpy).toHaveBeenCalledTimes(0);
  });

  // it('should create an instance', () => {
  //   const directive = new VirtualScrollDirective(inputEl);
  //   expect(directive).toBeTruthy();
  // });
});
