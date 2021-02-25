import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hoverElement]'
})
export class HoverDirective {
  @Input('hoverElement') color: string = 'whitesmoke'
  constructor(
    private el: ElementRef<unknown>,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseenter') onHover() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.color)
  }

  @HostListener('mouseleave') offHover() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color')
  }
}
