///<reference path="../../../../../node_modules/ng2-file-upload/file-upload/file-uploader.class.d.ts"/>
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie';
import {BaseDataService} from '../../../Service/base-data-service';
import {FileItem, FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {HttpUriService} from '../../../Service/http-uri-service';
import {UserService} from '../../../Service/user-service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {InfoBarService} from '../../../Service/info-bar-service';
import {HelperService} from '../../../Service/helper-service';
import {ReloadService} from '../../../Service/reload-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './user-center-page.component.html',
  styleUrls: ['./user-center-page.component.css'],
})
export class UserCenterPageComponent implements OnInit, AfterViewInit {

  private userCenterTitle = '用户中心';
  public userName = '';
  public userNameCache = '';
  public userPortrait = '';
  private url = '';
  private options: FileUploaderOptions;

  public inputUserName = '';
  public resetVerifyInput = '';
  public uploader: FileUploader;
  public passwordOldHide = true;
  public passwordNewHide = true;
  public passwordConfirmHide = true;
  public newPasswordInput = '';
  public oldPasswordInput = '';
  public confirmPasswordInput = '';
  public isShowProcess = false;
  public isPasswordInit = true;
  public passwordConfirmInfo = '';
  public taobaoChecked = false;
  public weichatChecked = false;
  public weiboChecked = true;
  public focusType = '';
  public socialAccountList = [
     {
      type: 'wechat',
      isChecked: false,
      detail: '',
      isFocused: false,
    },
    {
      type: 'weibo',
      isChecked: true,
      detail: '',
      isFocused: false,
    },
    {
      type: 'taobao',
      isChecked: true,
      detail: '',
      isFocused: false,
    }
  ];
  public step = '';
  private target: any;
  constructor(
    private cookieService: CookieService,
    public userService: UserService,
    private baseDataService: BaseDataService,
    public httpUriService: HttpUriService,
    public userCenterBar: InfoBarService,
    private helper: HelperService,
    public reloadService: ReloadService,
  ) {
    this.url = this.httpUriService.baseUrl + this.httpUriService.uploadPortrait;
    this.options = {
      autoUpload: true,
      removeAfterUpload: true,
      url: this.url
    };
    this.uploader = new FileUploader(this.options);
    this.uploader.onAfterAddingFile = () => this.afterAdd();
    this.uploader.onSuccessItem = (item, response, status, headers) => this.afterUpload(response);
  }

  ngOnInit() {
    this.baseDataService.title = this.userCenterTitle;
    this.baseDataService.toolBarTitle = this.userCenterTitle;
    this.userName = this.userService.userName;
    this.userNameCache = this.userName;
    this.userPortrait = this.userService.portrait;
    this.setSocialAccountList();

  }


  private setSocialAccountList() {
    for ( const index in this.socialAccountList) {
      if (!this.socialAccountList[index] ) {
        continue;
      }
      const type = this.socialAccountList[index].type;
      this.socialAccountList[index]['isChecked'] = this.userService.socialDetail[type]['valid'];
      this.socialAccountList[index]['detail'] = this.userService.socialDetail[type]['detail'];
      this.socialAccountList[index]['isFocused'] = false;
    }
  }

  afterAdd(): void {
    this.uploader.options.additionalParameter = {
      'userId': this.cookieService.get('userId'),
      'token': this.cookieService.get('token'),
    };
    this.isShowProcess = true;
  }

  /*
  上传一次头像后清零
   */
  public uploadPortraitChange(event: any) {
    event.target.value = '';
  }

  public socialAccountToggle(event: string) {

    this.focusType = event['type'];
    const toggleState = event['isChecked'];
    for (const index in this.socialAccountList) {
      if (!this.socialAccountList[index]) {
        continue;
      }
      const type = this.socialAccountList[index].type;
      if ( type === this.focusType) {
        this.socialAccountList[index]['isChecked'] =  toggleState;
        this.userService.socialDetail[type].valid = toggleState;
        this.socialAccountList[index]['isFocused'] = toggleState;
      }else {
        this.socialAccountList[index]['isFocused'] = false;
      }
      console.log(this.socialAccountList[index]);
    }
    this.reloadService.userDetailChange++;
  }

  afterUpload(data: string): void {
    this.uploader.destroy();
    this.uploader = new FileUploader(this.options);
    this.uploader.onAfterAddingFile = () => this.afterAdd();
    this.uploader.onSuccessItem = (item, response, status, headers) => this.afterUpload(response);
    this.isShowProcess = false;
    console.log(data);
    data = JSON.parse(data);
    if ( data['result'] !== 'success') {
      return;
    }
    this.userService.portrait = this.httpUriService.baseUrl + data['info'];
  }

  ngAfterViewInit(): void {
  }

  public updateUser() {

    // const body = 'userId=' + this.userService.userId
    //   + '&token=' + this.userService.token
    //   + '&userName=' + this.inputUserName;
    const params = new Map().set('userId', this.userService.userId)
                                 .set('token', this.userService.token)
                                 .set('userName', this.userNameCache);
    this.helper.httpPost(this.httpUriService.updateUserName,
      params)
            .subscribe(data => {
              // Read the result field from the JSON response.
      if ( data['result'] === 'success' ) {
        this.userService.userName = data['name'];
        this.userCenterBar.open('更新名字', '成功');
      }
    });
  }
  public updatePassword() {
    if (this.newPasswordInput !== this.confirmPasswordInput) {
      this.userCenterBar.open('请确认两次输入的密码相同', '');
      return;
    }


    const params = new Map().set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('oldPassword', this.oldPasswordInput)
      .set('newPassword', this.newPasswordInput);
    this.initPasswordTag();
    this.helper.httpPost(this.httpUriService.updateUserPassword,
      params)
      .subscribe(data => {
        // Read the result field from the JSON response.
        if ( data['result'] === 'success' ) {
          this.userCenterBar.open('更换密码', '成功');
        }else {
          this.userCenterBar.open(data['info'], '');
        }
      });
  }
  public initPasswordTag() {
    this.newPasswordInput = '';
    this.oldPasswordInput = '';
    this.confirmPasswordInput = '';
    this.isPasswordInit = true;
  }
  public passwordInfo(): string {
    if ( this.newPasswordInput !== '' ) {
      this.isPasswordInit = false;
    }
    if ( this.isPasswordInit) {
      return '';
    }
    if (this.newPasswordInput === this.confirmPasswordInput) {
      return '已确认密码相同';
    }else {
      return '两次输入的密码不同哦~';
    }
  }


  /*
  发送重置密码的验证码
   */
  public sendResetVerify() {
    const params = new Map().set('userId', this.userService.userId)
      .set('token', this.userService.token);
    this.helper.httpPost(this.httpUriService.sendResetVerifyCode,
      params)
      .subscribe(data => {
        // Read the result field from the JSON response.
        if ( data['result'] === 'success' ) {
          this.userCenterBar.open('请查收验证码', '');
        }
        if ( data['result'] === 'fail' ) {
          this.userCenterBar.open(data['info'], '');
        }
      });
  }

  /*
  通过验证码重置密码
   */
  public resetPassword() {
    const params = new Map().set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('verifyCode', this.resetVerifyInput);
    this.helper.httpPost(this.httpUriService.resetPassword,
      params)
      .subscribe(data => {
        // Read the result field from the JSON response.
        if ( data['result'] === 'success' ) {
          this.userCenterBar.open('密码重置为空', '成功');
        }
        if ( data['result'] === 'fail' ) {
          this.userCenterBar.open(data['info'], '');
        }
      });
  }
}
