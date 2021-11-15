import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
  selector: 'ip-preview-template',
  template: `
    <iframe #iframe [fxFlex]="getFlexWidth()" style="border: 0"></iframe>
    <mat-button-toggle-group value="desktop" (change)="changeDevice($event)" vertical>
      <mat-button-toggle
        value="desktop"
        matTooltip="{{ 'COMPONENTS.PREVIEW.DESKTOP' | translate }}"
        matTooltipPosition="left"
      >
        <mat-icon>desktop_windows</mat-icon>
      </mat-button-toggle>
      <mat-button-toggle
        value="tablet"
        matTooltip="{{ 'COMPONENTS.PREVIEW.TABLET' | translate }}"
        matTooltipPosition="left"
      >
        <mat-icon>tablet</mat-icon>
      </mat-button-toggle>
      <mat-button-toggle
        value="smartphone"
        matTooltip="{{ 'COMPONENTS.PREVIEW.SMARTPHONE' | translate }}"
        matTooltipPosition="left"
      >
        <mat-icon>smartphone</mat-icon>
      </mat-button-toggle>
    </mat-button-toggle-group>
  `,
  styles: [
    `
      iframe {
        opacity: 0.3;
        transition: all 0.3s ease-in-out;
      }

      iframe.active {
        opacity: 1;
      }

      mat-button-toggle-group {
        position: absolute;
        right: 0;
        background: white;
      }
    `,
  ],
})
export class PreviewTemplateComponent implements OnInit {
  @Input('template')
  template: string;

  @ViewChild('iframe', { read: ElementRef, static: false })
  iframe: ElementRef;

  device: 'desktop' | 'smartphone' | 'tablet' = 'desktop';

  changeDevice({ value }: MatButtonToggleChange) {
    this.device = value;
  }

  getFlexWidth() {
    return (
      (this.device === 'desktop' && '1 1 100%') ||
      (this.device === 'smartphone' && '1 1 360px') ||
      (this.device === 'tablet' && '1 1 768px')
    );
  }

  ngOnInit() {
    const { nativeElement } = this.iframe;
    const iframe =
      nativeElement.contentWindow || nativeElement.contentDocument.document || nativeElement.contentDocument;
    iframe.document.open();
    iframe.document.write(this.template);
    nativeElement.classList.add('active');
    iframe.document.close();
  }
}
