import { Component, OnInit } from '@angular/core';
import {UserService} from './Service/user-service';
import {BaseDataService} from './Service/base-data-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private useService: UserService,
    public baseDataService: BaseDataService,
  ) {}

  ngOnInit() {
    this.useService.loginByToken();
  }



}
