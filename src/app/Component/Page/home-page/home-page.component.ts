import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {BaseDataService} from '../../../Service/base-data-service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit {

  private homeTitle = '首页';
  public page = 1;
  public order = 'time';
  constructor(
    private baseDataService: BaseDataService,
    ) {
    this.page = 1;
    this.order = 'time';

  }
  ngAfterViewInit() {
    this.baseDataService.title = this.homeTitle;
    this.baseDataService.toolBarTitle = this.homeTitle;
  }
  ngOnInit() {

  }

}
