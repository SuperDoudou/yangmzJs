import {Component, ComponentFactoryResolver, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseDataService} from '../../Service/base-data-service';
import {ReloadService} from "../../Service/reload-service";

@Component({
  selector: 'app-operation-bar',
  templateUrl: './operation-bar.component.html',
  styleUrls: ['./operation-bar.component.css']
})
export class OperationBarComponent implements OnInit, OnChanges {

  @Input() private operationBarItems: {[key: string]: string}[];
  @Input() private reloadIndex: number;
  public likeItem;
  public shareItem;
  public commentItem;
  constructor(
    public reloadService: ReloadService,
  ) {
  }

  ngOnInit() {
  }


  ngOnChanges() {
    this.parseItems();
  }

  private parseItems() {
    for (const item of this.operationBarItems) {
      if (item['class'] === 'like') {
        this.likeItem = item;
      }
      if (item['class'] === 'share') {
        this.shareItem = item;
      }
      if (item['class'] === 'comment') {
        this.commentItem = item;
      }
    }
  }



}
