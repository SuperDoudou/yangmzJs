import {Injectable, OnChanges, OnInit} from '@angular/core';


@Injectable()
export class EventService implements OnInit, OnChanges {


  public articleCommentDialog = false;


  constructor(
  ) { }


  ngOnChanges() {}
  ngOnInit() {}

}
