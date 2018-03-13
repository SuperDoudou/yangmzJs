import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appWritePageText]'
})
export class WritePageTextDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
