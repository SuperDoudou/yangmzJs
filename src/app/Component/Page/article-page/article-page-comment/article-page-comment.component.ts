import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {HttpUriService} from '../../../../Service/http-uri-service';
import {HelperService} from '../../../../Service/helper-service';
import {LinkService} from '../../../../Service/link-service';

@Component({
  selector: 'app-article-page-comment',
  templateUrl: './article-page-comment.component.html',
  styleUrls: ['./article-page-comment.component.css']
})
export class ArticlePageCommentComponent implements OnInit, OnChanges {

  private _imageSrc = '';
  private _userId = '';
  private _userName = '';
  private _comment: string;
  private _time: string;
  @Input() public data: any;
  constructor(
    private httpUriService: HttpUriService,
    private helper: HelperService,
    private linkService: LinkService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setComment(this.data);
  }

  public setComment(data: Object): void {
    if (data == null || data['user'] == null || data['comment'] == null || data['createTime'] == null) {
      return;
    }
    this.userId = data['user']['id'];
    this.userName = data['user']['name'];
    this.imageSrc = data['user']['portraitAddress'];
    this.comment = data['comment'];
    this.time = HelperService.timestamp2String(data['createTime']);
  }
  get imageSrc(): string {
    return this._imageSrc;
  }

  set imageSrc(value: string) {
    this._imageSrc = value;
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }
}
