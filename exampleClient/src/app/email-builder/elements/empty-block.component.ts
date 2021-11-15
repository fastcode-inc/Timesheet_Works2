import { Component } from '@angular/core';

@Component({
  selector: 'ip-empty-block',
  template: ` <p>{{ 'ELEMENTS.EMPTY-BLOCK.TITLE' }}</p> `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        padding: 1rem;
        color: gray;
      }
    `,
  ],
})
export class EmptyBlockComponent {
  constructor() {}
}
