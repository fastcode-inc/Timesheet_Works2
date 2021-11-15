import { Directive, Input, ElementRef, OnInit, HostListener, ComponentRef, OnDestroy } from '@angular/core';
import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { CustomToolTipComponent } from '../components/custom-tool-tip/custom-tool-tip.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
  selector: '[customToolTip]',
})
export class ToolTipRendererDirective implements OnInit, OnDestroy {
  @Input() showToolTip = true;

  // If this is specified then specified json data will be showin in the tooltip
  @Input(`customToolTip`) data: any;

  private _overlayRef: OverlayRef;

  constructor(
    private _overlay: Overlay,
    private _overlayPositionBuilder: OverlayPositionBuilder,
    private _elementRef: ElementRef
  ) {}

  ngOnInit() {
    if (!this.showToolTip) {
      return;
    }

    const positionStrategy = this._overlayPositionBuilder.flexibleConnectedTo(this._elementRef).withPositions([
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
        offsetY: 5,
      },
    ]);

    this._overlayRef = this._overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    // attach the component if it has not already attached to the overlay
    if (this._overlayRef && !this._overlayRef.hasAttached()) {
      const tooltipRef: ComponentRef<CustomToolTipComponent> = this._overlayRef.attach(
        new ComponentPortal(CustomToolTipComponent)
      );
      tooltipRef.instance.data = this.data;
    }
  }

  @HostListener('mouseleave')
  hide() {
    this.closeToolTip();
  }

  ngOnDestroy() {
    this.closeToolTip();
  }

  private closeToolTip() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }
}
