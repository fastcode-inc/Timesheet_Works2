import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { IpEmailBuilderService } from '../ip-email-builder.service';
import { IFontFamily } from '../interfaces';

@Component({
  selector: 'ip-builder-container',
  template: '<div #header></div><ng-content></ng-content>',
  styleUrls: ['./builder-container.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class BuilderContainerComponent implements OnInit, OnDestroy {
  @ViewChild('header', { read: ElementRef, static: true })
  header: ElementRef;
  fonts: IFontFamily;

  constructor(_EBS: IpEmailBuilderService) {
    this.fonts = _EBS.getFonts();
  }

  ngOnInit() {
    this.fonts.forEach((href, key) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.id = key;
      link.href = href;
      this.header.nativeElement.appendChild(link);
    });
  }

  ngOnDestroy() {
    this.header.nativeElement.querySelectorAll('link').forEach((link) => link.remove());
  }
}
