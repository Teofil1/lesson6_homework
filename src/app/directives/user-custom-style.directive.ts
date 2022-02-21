import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[userCustomStyle]'
})
export class UserCustomStyleDirective implements OnChanges {

  @Input()
  userCustomStyle!: string;

  constructor(private elementRef: ElementRef) {    
  }

  ngOnChanges(): void {
    if(this.userCustomStyle == 'programmer'){
      this.elementRef.nativeElement.parentElement.style['background-color'] = 'green';
      this.elementRef.nativeElement.parentElement.style['color'] = 'white';
    } else {
      this.elementRef.nativeElement.parentElement.style['background-color'] = 'white';
      this.elementRef.nativeElement.parentElement.style['color'] = 'black';
    }
  }

}
