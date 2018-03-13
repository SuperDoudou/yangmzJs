import {Injectable, OnChanges, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatSnackBarRef} from '@angular/material';

@Injectable()
export class BaseDataService implements OnInit, OnChanges {



  constructor(
    private titleService: Title,
  ) { }

  private _title = 'app';
  private _toolBarTitle = '羊毛戳戳';
  private _locationExtraBackTime = 0;
  private _isNeedOperationBar = false;

  // {'class' => 'like|share|comment'}
  // {'class' => 'like', 'articleId' => 1}
  public operationBarItems: {[key: string]: string}[];

  ngOnChanges(): void {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
  }


  get toolBarTitle(): string {
    return this._toolBarTitle;
  }

  set toolBarTitle(value: string) {
    this._toolBarTitle = value;
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }


  get isNeedOperationBar(): boolean {
    return this._isNeedOperationBar;
  }

  set isNeedOperationBar(value: boolean) {
    this._isNeedOperationBar = value;
  }

  get locationExtraBackTime(): number {
    return this._locationExtraBackTime;
  }

  set locationExtraBackTime(value: number) {
    this._locationExtraBackTime = value;
  }
}
