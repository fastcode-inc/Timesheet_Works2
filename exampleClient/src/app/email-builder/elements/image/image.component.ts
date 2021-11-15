import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ImageBlock } from '../../classes/Elements';
import { createBorder, createPadding, createWidthHeight } from '../../utils';

@Component({
  selector: 'ip-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  @Input()
  public block: ImageBlock = new ImageBlock();

  @HostBinding('style.textAlign')
  get align() {
    return this.block.options.align;
  }

  constructor() {}

  getImageStyles() {
    const { border, width, height, padding } = this.block.options;

    return {
      width: createWidthHeight(width),
      height: createWidthHeight(height),
      ...createPadding(padding),
      ...createBorder(border),
    };
  }

  ngOnInit() {}
}
