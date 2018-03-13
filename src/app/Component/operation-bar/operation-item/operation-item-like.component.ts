import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HelperService} from '../../../Service/helper-service';
import {HttpUriService} from '../../../Service/http-uri-service';
import {UserService} from '../../../Service/user-service';
import {DialogService} from '../../../Service/dialog-service';

@Component({
  selector: 'app-operation-item-like',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.css']
})
export class OperationItemLikeComponent implements OnInit, OnChanges {

  // like | share | comment
  public type = '';
  public text = '';
  public classType = '';
  @Input() public data: any;
  @Input() public reloadIndex: number;
  constructor(
    private helper: HelperService,
    private httpUriService: HttpUriService,
    private userService: UserService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {

  }


  ngOnChanges() {
    console.log('like button change');
    this.setType();
    if ( this.type === 'like' ) {
      this.getLike();
    }
  }

  public setType() {
    this.type = this.data['class'];
    if ( this.data['isLike'] === 'false' ) {
      this.setHtml('icon-zantong', '点赞');
    } else {
      this.setHtml('icon-zantongfill', '已赞');
    }
  }

  public setHtml( classType: string, text: string) {
    this.text = text;
    this.classType = classType;
  }

  public doClick() {
    console.log('like click');
    this.doLike(this.data);
  }


  private getLike() {
    const uri = this.httpUriService.getArticleLike.replace('{id}', this.data['articleId']);
    const params = this.userService.getHttpMap();
    this.helper.httpPost(uri, params)
      .subscribe(data => this.renderingLikeButton(data) );
  }

  // data['result']
  // true => like
  // false => no like
  // fail => no login
  private renderingLikeButton(data: any) {
    this.data['isLike'] = 'true';
    if ( data['result'] === 'true') {
      this.data['isLike'] = 'true';
    }
    if ( data['result'] === 'false' || data['result'] === 'fail' ) {
      this.data['isLike'] = 'false';
    }
    this.setType();
  }

  /*
  data['articleId']
   */
  public doLike(data: any) {
    console.log('like operation');
    if (!this.userService.isLogin) {
      this.dialogService.loginDialog();
      return;
    }
    const articleId = data['articleId'];
    const params = new Map()
      .set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('articleId', articleId);
    this.helper.httpPost(this.httpUriService.uploadArticleLike, params)
      .subscribe(httpData => this.triggerLikeButton(httpData));
  }

  private triggerLikeButton(data: any) {
    if ( this.data['isLike'] === 'false') {
      this.data['isLike'] = 'true';
    }else {
      this.data['isLike'] = 'false';
    }
    this.setType();
  }
}
