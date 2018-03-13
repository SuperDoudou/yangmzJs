import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class LinkService implements OnInit {

  public articleLink = '/article/{id}';
  constructor(
  ) { }

  ngOnInit() {
  }

}
