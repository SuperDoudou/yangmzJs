import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write-page-text',
  templateUrl: './write-page-text.component.html',
  styleUrls: ['./write-page-text.component.css']
})
export class WritePageTextComponent implements OnInit {

  private _imageSrc: string;
  // 用于设置占空，避免错误的请求
  private _isInit = false;

  private _imageId: number;
  private _text = '';

  constructor() { }

  ngOnInit() {
  }

  public initSrc(src: string) {
    this.imageSrc = src;
    this.isInit = true;
  }


  get imageId(): number {
    return this._imageId;
  }

  set imageId(value: number) {
    this._imageId = value;
  }

  get isInit(): boolean {
    return this._isInit;
  }

  set isInit(value: boolean) {
    this._isInit = value;
  }

  get imageSrc() {
    return this._imageSrc;
  }

  set imageSrc(value) {
    this._imageSrc = value;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }
}
