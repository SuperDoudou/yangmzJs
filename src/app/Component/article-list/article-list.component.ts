import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {ArticleListItemDirective} from './article-list-item.directive';
import {HttpUriService} from '../../Service/http-uri-service';
import {InfoBarService} from '../../Service/info-bar-service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../Service/user-service';
import {ArticlePageCommentComponent} from '../Page/article-page/article-page-comment/article-page-comment.component';
import {BaseDataService} from '../../Service/base-data-service';
import {HttpClient} from '@angular/common/http';
import {DialogService} from '../../Service/dialog-service';
import {ArticlePageItemComponent} from '../Page/article-page/article-page-item/article-page-item.component';
import {ComponentRef} from '@angular/core/src/linker/component_factory';
import {ArticleListItemComponent} from './ariticle-list-item/article-list-item.component';
import {HelperService} from '../../Service/helper-service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  @Input() page: number;
  @Input() order: string;

  private items: ComponentRef<ArticleListItemComponent>[] = [];
  private itemFactory: any;
  @ViewChild(ArticleListItemDirective) articlePageItemDirective: ArticleListItemDirective;
  private viewContainerRef: any;

  constructor(
    private baseDataService: BaseDataService,
    private httpUriService: HttpUriService,
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver,
    private userService: UserService,
    private articlePageBar: InfoBarService,
    private dialogService: DialogService,
    private helper: HelperService,
  ) {
    this.itemFactory = componentFactoryResolver.resolveComponentFactory(ArticleListItemComponent);
  }

  ngOnInit() {
    let uri = this.httpUriService.getArticleList;
    uri = uri.replace('{page}', this.page + '');
    uri = uri.replace('{order}', this.order + '');
    this.helper.httpGet( uri)
      .subscribe(data => this.addArticle(data) );
  }

  private addArticle(data: Object) {
    const numOfArticle: number = +data['numOfArticle'];
    for (let i = 0; i < numOfArticle; i++) {
      this.viewContainerRef = this.articlePageItemDirective.viewContainerRef;
      const componentRef = this.viewContainerRef.createComponent(this.itemFactory);
      componentRef.instance.setData(data['articleList'][i]);
    }
  }
}
