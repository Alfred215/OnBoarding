import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[autoBlur]'
})
export class AutoBlurDirective {
  @HostListener('click', ['$event']) onHostClick(event) {
    setTimeout(() => {
      this.el.nativeElement.blur();
    }, 0);
  }

  constructor(
    private el: ElementRef<HTMLElement>
  ) {
  }

}
