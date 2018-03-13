import {Injectable, OnInit} from '@angular/core';
import {LoginDialogComponent} from '../Component/dialog/login-dialog/login-dialog.component';
import {MatDialog} from '@angular/material';

@Injectable()
export class DialogService implements OnInit {

  public dialogConfig = {
    panelClass: 'myapp-dialog',
    width: '80%',
    maxWidth: '500px',
    position: {
      // top: '90px',
      // left: '10%',
    },
    closeOnNavigation: true,
  };

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public loginDialog() {
    this.dialogConfig['data'] = {};
    this.dialog.open(LoginDialogComponent, this.dialogConfig);
  }



}
