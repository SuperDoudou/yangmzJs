import {Component, Injectable, OnChanges, OnInit} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material';

@Injectable()
export class InfoBarService implements OnInit {

  private _infoBarMessage = '';
  private _infoBarInfo = '';
  private _barRef: MatSnackBarRef<InfoBarComponent>;


  constructor(
    private matBar: MatSnackBar,
  ) { }

  private barConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    extraClasses: ['extraSnackBar']
  };


  public open(message: string, info: string) {
    // this.matBar.open(action, info, this.barConfig);
    this.infoBarMessage = message;
    this.infoBarInfo = info;
    this.barRef = this.matBar.openFromComponent(InfoBarComponent, this.barConfig);

  }

  ngOnInit() {

  }

  get infoBarMessage(): string {
    return this._infoBarMessage;
  }

  set infoBarMessage(value: string) {
    this._infoBarMessage = value;
  }

  get infoBarInfo(): string {
    return this._infoBarInfo;
  }

  set infoBarInfo(value: string) {
    this._infoBarInfo = value;
  }

  get barRef(): MatSnackBarRef<InfoBarComponent> {
    return this._barRef;
  }

  set barRef(value: MatSnackBarRef<InfoBarComponent>) {
    this._barRef = value;
  }
}

@Component({
  template: ''
  + '<div class="bar-box" (click)="closeBar()">'
    + '<div class="bar-item">'
      +  '{{infoBarService.infoBarMessage}}'
    + '</div>'
    + '<div class="bar-item">'
      +  '{{infoBarService.infoBarInfo}}'
    + '</div>'
  + '</div>',
  styles: ['.bar-box{display:flex;justify-content:space-between;padding: 16px 24px;} '
  + '.bar-item{display:flex;font-weight:bold;}'],
})
// 如果需要修改container的样式需要修改源代码
export class InfoBarComponent {
  constructor(
    public infoBarService: InfoBarService,
  ) {}
  public closeBar() {
    this.infoBarService.barRef.closeWithAction();
  }
}
