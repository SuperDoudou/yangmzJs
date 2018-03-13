import {Injectable, OnChanges, OnInit} from '@angular/core';


@Injectable()
export class ReloadService implements OnInit, OnChanges {


  public userLoginChange = 0;
  public userDetailChange = 0;

  public articleAddCommentText = '';
  public articleAddComment = 0;

  constructor(
  ) { }


  ngOnChanges() {}
  ngOnInit() {}

}
