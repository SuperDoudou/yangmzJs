import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../../../Service/user-service';
import {HelperService} from '../../../Service/helper-service';
import {HttpUriService} from '../../../Service/http-uri-service';
import {InfoBarService} from '../../../Service/info-bar-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ReloadService} from '../../../Service/reload-service';
import {EventService} from "../../../Service/event-service";

@Component({
  selector: 'app-article-comment-dialog',
  templateUrl: './article-comment-dialog.component.html',
  styleUrls: ['../dialog.component.css']
})
export class ArticleCommentDialogComponent implements OnInit {

  public inputComment = '';
  constructor(
    public dialogRef: MatDialogRef<ArticleCommentDialogComponent>,
    public userService: UserService,
    private helper: HelperService,
    private httpUriService: HttpUriService,
    private infoBarService: InfoBarService,
    private reloadService: ReloadService,
    private eventService: EventService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }


  /**
   *  关闭 评论dialog对话框
   */
  onCloseClick(): void {
    this.eventService.articleCommentDialog = false;
    this.dialogRef.close();
  }

  public uploadComment() {
    if (!this.userService.isLogin) {
      return;
    }
    // const body = 'userId=' + this.userService.userId
    //   + '&token=' + this.userService.token
    //   + '&userName=' + this.inputUserName;
    const body = new Map();
    body.set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('articleId', this.data['articleId'])
      .set('comment', this.inputComment);
    this.helper.httpPost(this.httpUriService.uploadArticleComment,
      body)
      .subscribe(data => {
        // Read the result field from the JSON response.
        if ( data['result'] === 'success' ) {
          this.infoBarService.open('提交评论', '成功');
          this.dialogRef.close();
          this.reloadService.articleAddCommentText = this.inputComment;
          this.reloadService.articleAddComment++;
          this.eventService.articleCommentDialog = false;
          return;
        }
        if (data['info'] === 'comment too short') {
          this.infoBarService.open('评论过短', '失败');
          return;
        }
        this.infoBarService.open(data['info'], '失败');
      });
  }

}
