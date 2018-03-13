import {Component, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpUriService} from '../../../Service/http-uri-service';
import {UserService} from '../../../Service/user-service';
import {CookieService} from 'ngx-cookie';
import {InfoBarService} from '../../../Service/info-bar-service';
import {HelperService} from '../../../Service/helper-service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BaseDataService} from '../../../Service/base-data-service';
import {ReloadService} from '../../../Service/reload-service';

@Component({
  selector: 'app-dialog-data-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['../dialog.component.css']
})

export class LoginDialogComponent {
  emailAddress = '';
  loginCode = '';
  verifyButton = {
    state : true,
    text : '验证码'
  };
  private EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(
    private uriService: HttpUriService,
    private http: HttpClient,
    private user: UserService,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private loginBar: InfoBarService,
    private helper: HelperService,
    private reloadService: ReloadService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  isValidEmail(): boolean {
    // console.log('Entry isValidEmail()' + this.emailAddress);
    if ( this.emailAddress === '' ) {
      // console.log('Exit isValidEmail() true');
      return true;
    }
    if ( !this.emailAddress.match(this.EMAIL_REGEX) ) {
      // console.log('Exit isValidEmail() false');
      return false;
    }
    // console.log('Exit isValidEmail() true');
    return true;
  }
  /**
   *  关闭 登陆dialog对话框
   */
  onCloseClick(): void {
    this.dialogRef.close();
  }

  /**
   * 通过Email请求验证码
   */
  sendVerifyCode(): void {
    console.log('Entry sendVerifyCode() ' + this.emailAddress);
    this.verifyButton.text = '已发送';
    this.verifyButton.state = false;
    const params = new Map().set('email', this.emailAddress);

    this.helper.httpPost( this.uriService.sendVerifyCode, params).subscribe();
  }

  /**
   * 通过Email登陆
   */
  loginByEmail(): void {
    console.log('Entry loginByEmail()' + this.emailAddress );

    const params = new Map().set('email', this.emailAddress)
      .set('code', this.loginCode);

    this.helper.httpPost( this.uriService.loginByEmail, params).subscribe(data => {
      // Read the result field from the JSON response.
        if (data['result'] !== 'success') {
          console.log('登陆失败');
          this.loginBar.open('用户登陆', '失败');
          this.cookieService.remove('userID');
          this.cookieService.remove('token');
        }else {
          console.log('登陆成功 userId = ' + this.user.userId);
          this.dialogRef.close();
          this.loginBar.open('用户登陆', '成功');
          this.user.setUser(data);
          this.user.isLogin = true;
          this.reloadService.userLoginChange++;
        }
      }, err => {
        this.loginBar.open('服务器错误', '失败');
      });
  }
}
