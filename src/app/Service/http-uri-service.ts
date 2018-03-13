import {Injectable, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpUriService implements OnInit {

  public baseUrl = 'http://www.yangmz.com';
  public sendVerifyCode = '/sso/setVerifyByEmail';
  public loginByEmail = '/sso/loginByEmail';
  public loginByToken = '/sso/loginByToken';


  public uploadPortrait = '/user/uploadPortrait';
  public updateUserName = '/user/updateUserName';
  public updateUserPassword = '/user/updatePassword';
  public changeDetailValid = '/user/changeDetailValid';
  public updateUserDetail = '/user/updateDetail';
  public sendResetVerifyCode = '/user/sendResetVerifyCode';
  public resetPassword = '/user/resetPassword';

  public uploadArticleImage = '/app/uploadArticle/image';
  public uploadArticle = '/app/uploadArticle/text';
  public uploadArticleComment = '/app/uploadArticle/comment';
  public uploadArticleLike = '/app/uploadArticle/like';

  public getArticleList = '/app/getArticleList/page/{page}/order/{order}';
  public getArticleComment = '/app/getArticle/comment/{id}/page/{page}';
  public getArticleLike = '/app/getArticle/like/{id}';
  public getArticle = '/app/getArticle';

  constructor() { }

  ngOnInit() {
  }

}
