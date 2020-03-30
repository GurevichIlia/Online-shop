import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDetectChange]'
})
export class DetectChangeDirective {

  constructor(private element: ElementRef, private sanitizer: DomSanitizer) {

    // debugger
    // const event$ = fromEvent(this.element.nativeElement, 'click');

    // event$.subscribe(() => console.log('EVENT WORKS', this.element));
    // this.element.nativeElement.innerHTML = 'HELLO';
    // this.element.nativeElement.addEventListener('click', console.log(this.element));
    const test = this.element.nativeElement.contentWindow;

  }

  @HostListener('click') show() {
    console.log('RELOAD', this.element);
  }


  // @HostListener('click') onClick() {
  //   console.log('Host Element Clicked');
  // }

}
