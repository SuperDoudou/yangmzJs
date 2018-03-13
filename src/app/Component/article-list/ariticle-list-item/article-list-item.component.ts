import { Component, OnInit } from '@angular/core';
import {HttpUriService} from "../../../Service/http-uri-service";
import {HelperService} from "../../../Service/helper-service";
import {LinkService} from "../../../Service/link-service";

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css']
})
export class ArticleListItemComponent implements OnInit {

  public id: string;
  public userName: string;
  public userId: string;
  public userPortraitAddress: string;
  public title: string;
  public headImageAddress: string;
  public viewNum: string;
  public likeNum: string;
  public commentNum: string;
  public createTime: string;
  public link: string;


  constructor(
    private httpUriService: HttpUriService,
    private helperService: HelperService,
    private linkService: LinkService,
              ) { }

  ngOnInit() {
  }

  public setData(data: Object): void {
    this.id = data['id'];
    this.userId = data['user']['id'];
    this.userName = data['user']['name'];
    this.userPortraitAddress = this.httpUriService.baseUrl + data['user']['portraitAddress'];
    this.title = data['title'];
    this.headImageAddress = this.httpUriService.baseUrl + data['headImageAddress'];
    this.viewNum = data['viewNum'];
    this.likeNum = data['likeNum'];
    this.commentNum = data['commentNum'];
    this.createTime = HelperService.timestamp2String(data['createTime']);
    this.link = this.linkService.articleLink.replace('{id}', this.id);
  }
}
