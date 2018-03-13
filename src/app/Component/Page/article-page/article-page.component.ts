import {
  Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, AfterContentInit,
  Input, OnChanges, SimpleChanges
} from '@angular/core';
import {BaseDataService} from '../../../Service/base-data-service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpUriService} from '../../../Service/http-uri-service';
import {ArticlePageItemDirective} from './article-page-item.directive';
import {ComponentRef} from '@angular/core/src/linker/component_factory';
import {ArticlePageItemComponent} from './article-page-item/article-page-item.component';
import {UserService} from '../../../Service/user-service';
import {InfoBarService} from '../../../Service/info-bar-service';
import {DialogService} from '../../../Service/dialog-service';
import {HelperService} from '../../../Service/helper-service';
import {ReloadService} from '../../../Service/reload-service';
import {ArticleCommentDialogComponent} from '../../dialog/article-comment-dialog/article-comment-dialog.component';
import {MatDialog} from '@angular/material';
import {EventService} from '../../../Service/event-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  public articleTitle = '';
  public userName = '';
  public userPortraitAddress = '';
  public viewNum: number;
  public commentNum: number;
  public likeNum: number;
  public createTime = '';

  @Input() public articleAddCommentReload: number;
  @Input() public commentDialogEvent: boolean;
  private commentPage = 1;
  private homeTitle = '作品';
  public articleId = '';
  private viewContainerRef: any;
  private items: ComponentRef<ArticlePageItemComponent>[] = [];
  private itemFactory: any;
  public commentList: any;
  private numOfComment = 0;
  private likeOperationIndex = 2;
  private operationBarList: {[key: string]: string}[]
    = [
        {'class': 'share', 'order': '1'},
        {'class': 'comment' , 'order': '2'},
        {'class': 'like', 'order': '3',
          'isLike': 'false',
          'articleId': this.articleId},
  ];

  @ViewChild(ArticlePageItemDirective) articlePageItemDirective: ArticlePageItemDirective;

  constructor(
    private baseDataService: BaseDataService,
    private httpUriService: HttpUriService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver,
    private userService: UserService,
    private articlePageBar: InfoBarService,
    private dialogService: DialogService,
    private helper: HelperService,
    private reloadService: ReloadService,
    private eventService: EventService,
    private dialog: MatDialog,
    private location: Location,
    ) {
    this.baseDataService.isNeedOperationBar = true;
    this.baseDataService.operationBarItems = this.operationBarList;
    this.itemFactory = componentFactoryResolver.resolveComponentFactory(ArticlePageItemComponent);
  }

  ngAfterViewInit() {
    this.baseDataService.title = this.homeTitle;
    this.baseDataService.toolBarTitle = this.homeTitle;

  }
  ngOnInit() {
    console.log('Enter Article');

    this.route.paramMap
      .switchMap(
        (params: ParamMap) => this.setArticleId(params)
      ).subscribe(data =>
        this.getPageDate()
    );
  }

  ngOnDestroy() {
    this.baseDataService.isNeedOperationBar = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if ( changes.hasOwnProperty(propName)) {
        if (propName === 'articleAddCommentReload' && changes[propName].currentValue > 0) {
          setTimeout(() => this.addOneComment(), 0);
        }
        if (propName === 'commentDialogEvent' && changes[propName].currentValue) {
          setTimeout(() => this.articleCommentDialog(), 0);
        }
      }
    }
  }

  public articleCommentDialog() {
    const data = {};
    data['articleId'] = this.articleId;
    data['title'] = this.articleTitle;
    data['userPortraitAddress'] = this.userPortraitAddress;
    const config = this.dialogService.dialogConfig;
    config['data'] = data;
    this.dialog.open(ArticleCommentDialogComponent, config);
  }

  private addOneComment() {
    window.location.hash = '#none';
    this.location.back();


    this.reloadService.articleAddComment = 0;
    for (let i = this.numOfComment; i >= 1; i-- ) {
      this.commentList[i] = this.commentList[i - 1];
    }
    this.commentList[0] = {
      comment: this.reloadService.articleAddCommentText,
      createTime: new Date().getTime(),
      user: {
        name: this.userService.userName,
        portraitAddress: this.userService.portrait,
      },
    };
    setTimeout(() => window.location.hash = '#article-comment-container', 300);
    this.baseDataService.locationExtraBackTime = 1;
  }

  private getPageDate() {
    this.getArticle();
    this.getComment();
  }
  /*
  获取文章数据
   */
  private getArticle() {
    this.helper.httpGet(this.httpUriService.getArticle + '/' + this.articleId)
      .subscribe(data => this.initArticle(data));
  }

  /*
  获取评论数据
   */
  private getComment() {
    let uri = this.httpUriService.getArticleComment.replace('{id}', this.articleId);
    uri = uri.replace('{page}', this.commentPage + '');
    this.helper.httpGet(uri)
      .subscribe(data => this.addComment(data) );
  }


  private addComment(data: any) {
    this.numOfComment = +data['numOfComment'];
    console.log(data);
    let count = 0;
    for ( const i in data['commentList'] ) {
      if (data['commentList'][i]) {
        data['commentList'][i]['user']['portraitAddress'] = this.httpUriService.baseUrl + data['commentList'][i]['user']['portraitAddress'];
        count++;
      }
    }
    this.commentList = data['commentList'];
  }

  public setArticleId (params: ParamMap): Promise<string> {
    this.articleId = params.get('id');
    console.log('id = ' + this.articleId );
    // refresh article id
    this.refreshOperationBarData();

    return Promise.resolve(this.articleId);
  }

  private refreshOperationBarData() {
    for (const operation of this.operationBarList) {
      if ( operation['class'] === 'like') {
        operation['articleId'] = this.articleId;
      }
      if ( operation['class'] === 'comment' ) {

      }
    }
  }
  private initArticle(data: any) {
    const numOfItem: number = +data['numOfItem'];
    this.viewContainerRef = this.articlePageItemDirective.viewContainerRef;

    for (let i = 0; i < numOfItem; i++) {
      const componentRef = this.viewContainerRef.createComponent(this.itemFactory);
      this.items.push(componentRef);
      componentRef.instance.text = data['itemList'][i]['text'];
      componentRef.instance.imageSrc = this.httpUriService.baseUrl + data['itemList'][i]['imageAddress'];
    }

    this.articleTitle = data['title'];
    this.userName = data['userName'];
    this.likeNum = data['likeNum'];
    this.viewNum = +data['viewNum'] + 1;
    this.commentNum = data['commentNum'];
    this.createTime = HelperService.timestamp2String(data['createTime']);
    this.userPortraitAddress = this.httpUriService.baseUrl + data['userPortraitAddress'];
    this.refreshOperationBarData();
  }
}
