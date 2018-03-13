import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-write-page-text',
  templateUrl: './article-page-item.component.html',
  styleUrls: ['./article-page-item.component.css']
})
export class ArticlePageItemComponent implements OnInit {

  private _imageSrc = '';
  // 用于设置占空，避免错误的请求
  private _text: string;

  constructor() { }

  ngOnInit() {
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
