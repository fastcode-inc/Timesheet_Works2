import { Directive, ComponentFactoryResolver, ViewContainerRef, Input, Type } from '@angular/core';
import { TextElementComponent } from '../elements/text-element/text-element.component';
import { ImageComponent } from '../elements/image/image.component';
import { ButtonComponent } from '../elements/button/button.component';
import { DividerComponent } from '../elements/divider/divider.component';
import { SpacerComponent } from '../elements/spacer/spacer.component';
import { SocialComponent } from '../elements/social/social.component';

// https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e
@Directive({
  selector: '[ipDynamicComponent]',
})
export class DynamicComponentDirective {
  @Input()
  set ipDynamicComponent(block) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentsMap.get(block.type));
    this.viewContainerRef.createComponent(componentFactory).instance.block = block;
  }

  private componentsMap: Map<string, Type<any>> = new Map();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef // private templateRef: TemplateRef<any>
  ) {
    this.componentsMap.set('text', TextElementComponent);
    this.componentsMap.set('image', ImageComponent);
    this.componentsMap.set('button', ButtonComponent);
    this.componentsMap.set('divider', DividerComponent);
    this.componentsMap.set('spacer', SpacerComponent);
    this.componentsMap.set('social', SocialComponent);
  }
}
