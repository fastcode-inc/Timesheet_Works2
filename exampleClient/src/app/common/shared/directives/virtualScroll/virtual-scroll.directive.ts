import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appVirtualScroll]',
})
export class VirtualScrollDirective {
  private element: HTMLInputElement;

  @Output() onScroll: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
    this.element.addEventListener('scroll', this.scrollEventHandler, true);
  }

  /**
   * Handles scroll event of the element
   * and emits onScroll event.
   */
  scrollEventHandler = (e: any) => {
    const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 40px of the bottom, add more data
    const buffer = 40;
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit) {
      this.onScroll.emit();
    }
  };
}
