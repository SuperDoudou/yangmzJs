import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appArticleListItem]'
})
export class ArticleListItemDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
