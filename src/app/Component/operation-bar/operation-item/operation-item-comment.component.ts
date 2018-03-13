import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HelperService} from '../../../Service/helper-service';
import {HttpUriService} from '../../../Service/http-uri-service';
import {UserService} from '../../../Service/user-service';
import {DialogService} from '../../../Service/dialog-service';
import {EventService} from "../../../Service/event-service";

@Component({
  selector: 'app-operation-item-comment',
  templateUrl: './operation-item.component.html',
  styleUrls: ['./operation-item.component.css']
})
export class OperationItemCommentComponent implements OnInit, OnChanges {

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
    private eventService: EventService,
  ) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.setType();
  }

  public doClick() {
    this.doComment();
  }



  public doComment() {
    console.log('comment operation');
    if (!this.userService.isLogin) {
      this.dialogService.loginDialog();
      return;
    }
    this.eventService.articleCommentDialog = true;
  }

  public setType() {
    this.type = this.data['class'];
    this.setHtml('icon-31pinglun', '评论');
  }

  public setHtml( classType: string, text: string) {
    this.text = text;
    this.classType = classType;
  }

}
