import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {BaseDataService} from '../../../Service/base-data-service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css'],
})
export class UserInfoPageComponent implements OnInit, AfterViewInit {

  public userId = '';
  public qrValue = 'doudo';
  public qrWidth = 200;

  constructor(
    private baseDataService: BaseDataService,
    private route: ActivatedRoute,
    ) {

  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    console.log('Enter UserInfo');
    this.route.paramMap
      .switchMap(
        (params: ParamMap) => this.setUserId(params)
      ).subscribe(data =>
      this.getPageDate()
    );

  }

  private getPageDate() {
    this.getUserInfo();
    this.isFollowed();
  }

  public setUserId(params: ParamMap): Promise<string> {
    this.userId = params.get('id');
    console.log('id = ' + this.userId );
    return Promise.resolve(this.userId);
  }


  private isFollowed() {

  }

  private getUserInfo() {

  }
}
