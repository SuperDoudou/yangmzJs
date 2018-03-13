import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appArticlePageItem]'
})
export class ArticlePageItemDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
