import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SpacerBlock } from '../../classes/Elements';
import { createWidthHeight } from '../../utils';

@Component({
  selector: 'ip-spacer',
  template: '',
  styles: [
    `
      :host {
        display: table;
        width: 100%;
      }
    `,
  ],
})
export class SpacerComponent {
  @Input()
  block: SpacerBlock = new SpacerBlock();

  @HostBinding('style.height')
  get height() {
    return createWidthHeight(this.block.options.height);
  }

  constructor() {}
}
