import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HelperService} from '../../../Service/helper-service';
import {HttpUriService} from '../../../Service/http-uri-service';
import {UserService} from '../../../Service/user-service';
import {DialogService} from '../../../Service/dialog-service';

@Component({
  selector: 'app-operation-item-share',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.css']
})
export class OperationItemShareComponent implements OnInit, OnChanges {

  // like | share | comment
  public type = '';
  public text = '';
  public classType = '';
  @Input() public data: any;
  constructor(
    private helper: HelperService,
    private httpUriService: HttpUriService,
    private userService: UserService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.setType();
  }
  public setType() {
    this.type = this.data['class'];
    this.setHtml('icon-share', '分享');
  }

  public setHtml( classType: string, text: string) {
    this.text = text;
    this.classType = classType;
  }

  public doClick() {
  }

}
