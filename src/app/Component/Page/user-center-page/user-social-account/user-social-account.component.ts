import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle/typings/slide-toggle';
import {MatExpansionPanel} from '@angular/material';
import {UserService} from '../../../../Service/user-service';
import {HelperService} from '../../../../Service/helper-service';
import {HttpUriService} from '../../../../Service/http-uri-service';
import {InfoBarService} from '../../../../Service/info-bar-service';

@Component({
  selector: 'app-user-social-account',
  templateUrl: './user-social-account.component.html',
  styleUrls: ['./user-social-account.component.css']
})
export class UserSocialAccountComponent implements OnInit, OnChanges {

  @Input() public data: any;
  @Input() public reload: any;
  @Output() public change = new EventEmitter<any>();
  @ViewChild(MatExpansionPanel) public panel: MatExpansionPanel;
  public type = '';
  public typeText = '';
  public iconClass = '';
  public isChecked: boolean;
  public isFocused: boolean;
  public accountName: string;

  constructor(private userService: UserService,
              private helper: HelperService,
              private httpUriService: HttpUriService,
              private infoBarService: InfoBarService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const index in changes) {
      if ( !changes.hasOwnProperty(index)) {
        continue;
      }
      if (index === 'reload') {
        setTimeout(() => this.setFocus(), 0);
      }
      if (index === 'data' ) {
        setTimeout(() => this.setData(), 0);
      }
    }
  }

  // 在打开的情况下，触发开关，同时会触发panel的展开
  private setFocus() {
    this.isFocused = this.data['isFocused'];
    this.isChecked = this.data['isChecked'];
    if (!this.isFocused) {
      this.panel.close();
    }
    console.log(' ' + this.isFocused);
    console.log('type = ' + this.type + 'isFocused = ' + this.isFocused);
  }

  /*
    data = {
      type: weibo | wechat | taobao
      icChecked: boolean,
    }
   */
  private setData() {
    this.type = this.data['type'];
    this.isChecked = this.data['isChecked'];
    this.isFocused = this.data['isFocused'];
    this.accountName = this.data['detail'];
    if (this.type === 'weibo') {
      this.typeText = '微博';
      this.iconClass = 'xinlang';
    }
    if (this.type === 'wechat') {
      this.typeText = '微信';
      this.iconClass = 'weixin';
    }
    if (this.type === 'taobao') {
      this.typeText = '淘宝';
      this.iconClass = 'shoujitaobao';
    }
  }


  // event {checked: boolean, source: object}
  public checkedChange(event) {
    console.log('dada');
    this.checkedChangeHttp(event['checked']);
    const data = {
      type: this.type,
      isChecked: event['checked'],
    };
    setTimeout(() => this.change.emit(data), 100);
  }

  private checkedChangeHttp(isValid: boolean) {
    const params = new Map().set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('type', this.type)
      .set('isValid', '' + isValid);
    this.helper.httpPost(this.httpUriService.changeDetailValid, params)
      .subscribe(data => {
        // Read the result field from the JSON response.
        let barText = '设置';
        if ( !isValid ) {
          barText = barText + '不';
        }
        barText = barText + '公开' + this.typeText;
        if (data['result'] === 'success') {
          this.infoBarService.open( barText, '成功');
        }
      });
  }

  public updateDetail() {
    const params = new Map().set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('type', this.type)
      .set('detail', this.accountName);
    this.helper.httpPost(this.httpUriService.updateUserDetail, params)
      .subscribe(data => {
        // Read the result field from the JSON response.
        if (data['result'] === 'success') {
          this.infoBarService.open( '修改' + this.typeText + '账号', '成功');
        }
      });
  }
}
