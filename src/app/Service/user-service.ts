import {Injectable, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {MatDialog} from '@angular/material';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {HttpUriService} from './http-uri-service';
import {HelperService} from './helper-service';
import {Router} from '@angular/router';
import {BaseDataService} from "./base-data-service";
import {ReloadService} from "./reload-service";

@Injectable()
export class UserService implements OnInit {


  private day = 1000 * 60 * 60 * 24;
  private _userName = '';
  private _userId = '';
  private _token = '';
  private _portrait = '';
  private _isLogin= false ;
  private _isReady = false;

  public socialDetail =
  {
    wechat: {
      valid: false,
      detail: '',
    },
    taobao: {
      valid: false,
      detail: '',
    },
    weibo: {
      valid: false,
      detail: '',
    },
  };

  private weekCookieOptions = {
    expires: new Date(new Date().getTime() + 7 * this.day),
  };
  constructor(
    private cookieService: CookieService,
    private httpUriService: HttpUriService,
    private baseDataService: BaseDataService,
    private helper: HelperService,
    private reloadService: ReloadService,
  ) { }


  ngOnInit() {
  }


  public loginByToken() {
    this._userId = this.cookieService.get('userId');
    this._token = this.cookieService.get('token');
    if ( this._userId === null || this._userId === ''
      || this._token === null || this._token === '') {
      return;
    }
    const params = this.getHttpMap();
    this.helper.httpPost(this.httpUriService.loginByToken,
      params)
      .subscribe(data => {
      // Read the result field from the JSON response.
      if ( data['result'] === 'success' ) {
        this.isLogin = true;
        this.setUser(data);
        this.isReady = true;
        console.log('login success');
      }
    });
  }


  public getHttpMap(): Map<string, string> {
    const params = new Map().set('userId', this.userId)
      .set('token', this.token);
    return params;
  }

  public loginOut() {
    this._userName = '';
    this._userId = '';
    this._token = '';
    this._portrait = '';
    this._isLogin = false;
    this.reloadService.userLoginChange++;
  }

  /*
    data = {
      name: string
      id: number
      token: string
      portraitAddress: string
      name: string
    }
   */
  public setUser(data: any) {
    this._userName = data['name'];
    this._userId = data['id'];
    this._token = data['token'];
    this._portrait = this.httpUriService.baseUrl + data['portraitAddress'];
    this._isLogin = true;
    this.socialDetail['wechat']['valid'] = data['wechatDetailValid'] === 1;
    this.socialDetail['weibo']['valid'] = data['weiboDetailValid'] === 1;
    this.socialDetail['taobao']['valid'] = data['taobaoDetailValid'] === 1;

    this.socialDetail['wechat']['detail'] = data['wechatDetail'];
    this.socialDetail['weibo']['detail'] = data['weiboDetail'];
    this.socialDetail['taobao']['detail'] = data['taobaoDetail'];
    this.setCookie();
  }

  public setCookie() {
    this.cookieService.put('userId', this._userId, this.weekCookieOptions);
    this.cookieService.put('token', this._token , this.weekCookieOptions);
    this.cookieService.put('name', this._userName , this.weekCookieOptions);
    this.cookieService.put('portrait', this._portrait , this.weekCookieOptions);
  }

  public removeCookie() {
    this.cookieService.remove('userId');
    this.cookieService.remove('token');
    this.cookieService.remove('name');
    this.cookieService.remove('portrait');
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get isLogin(): boolean {
    return this._isLogin;
  }

  set isLogin(value: boolean) {
    this._isLogin = value;
  }

  get portrait(): string {
    return this._portrait;
  }

  set portrait(value: string) {
    this._portrait = value;
  }

  get isReady(): boolean {
    return this._isReady;
  }

  set isReady(value: boolean) {
    this._isReady = value;
  }
}
