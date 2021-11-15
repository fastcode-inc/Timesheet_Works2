import {
  Directive,
  ElementRef,
  Input,
  AfterViewInit,
  Renderer2,
  ViewContainerRef,
  ComponentFactoryResolver,
  Component,
  EmbeddedViewRef,
} from '@angular/core';

@Component({
  selector: 'app-iconc',
  template: `&nbsp;<mat-icon
      style="pointer-events:auto; margin-top: 1px; color: #b3b3b3; font-size: inherit;"
      [matTooltip]="toolTipText"
      >help</mat-icon
    >`,
})
export class IconComponent {
  toolTipText: string = '';
}

@Directive({
  selector: '[fcHelp]',
})
export class HelpDirective implements AfterViewInit {
  @Input('fcHelp') tooltip: string;
  constructor(
    private el: ElementRef,
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}
  ngAfterViewInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(IconComponent);
    const componentRef = this.viewContainerRef.createComponent<IconComponent>(componentFactory);
    componentRef.instance.toolTipText = this.tooltip;
    componentRef.changeDetectorRef.detectChanges();
    let htmlElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.renderer.appendChild(this.renderer.parentNode(this.el.nativeElement), htmlElement);
  }
}
