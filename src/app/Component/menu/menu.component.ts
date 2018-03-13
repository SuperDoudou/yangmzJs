import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {UserService} from '../../Service/user-service';
import {DialogService} from '../../Service/dialog-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private user: UserService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {

  }

  isLogin(): boolean {
    return this.user.isLogin;
  }
  public openLoginDialog() {
    this.dialogService.loginDialog();
  }

  openUserCenter() {

  }

  loginOut() {
    this.user.removeCookie();
    this.user.loginOut();
  }
}
