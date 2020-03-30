import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appChangeTheme]'
})
export class ChangeThemeDirective {
  themeClass: string;
  @Input() set themeName(themeName: string) {

    this.renderer.removeClass(this.el.nativeElement, this.el.nativeElement.classList[3]);
    this.renderer.addClass(this.el.nativeElement, themeName);

    this.themeClass = themeName;
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }



}
