import { Component, OnInit, Input } from '@angular/core';
import { ButtonBlock } from '../../classes/Elements';
import { createFont, createPadding, createBorder, createLineHeight } from '../../utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ip-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input()
  block: ButtonBlock = new ButtonBlock(this.translate.instant('ELEMENTS.BUTTONS.DEFAULT-TEXT'));
  constructor(private translate: TranslateService) {}

  getButtonStyles() {
    const { backgroundColor, border, color, font, lineHeight, innerPadding } = this.block.options;

    return {
      color,
      backgroundColor,
      ...createFont(font),
      ...createPadding(innerPadding),
      ...createBorder(border),
      ...createLineHeight(lineHeight),
    };
  }

  getParentStyles() {
    const { align, padding } = this.block.options;

    return {
      justifyContent: (align === 'center' && 'center') || (align === 'right' && 'flex-end') || 'flex-start',
      ...createPadding(padding),
    };
  }

  ngOnInit() {}
}
