import { Component, OnInit, Input } from '@angular/core';
import { DividerBlock } from '../../classes/Elements';
import { createBorder, createPadding } from '../../utils';

@Component({
  selector: 'ip-divider',
  template: '<div [ngStyle]="getDividerStyles()"></div>',
  styles: [
    `
      :host {
        display: table;
        width: 100%;
      }
    `,
  ],
})
export class DividerComponent implements OnInit {
  @Input()
  block: DividerBlock = new DividerBlock();

  constructor() {}

  getDividerStyles() {
    const { border, padding } = this.block.options;
    return {
      ...createBorder(border, 'borderTop'),
      ...createPadding(padding, 'margin'),
    };
  }

  ngOnInit() {}
}
