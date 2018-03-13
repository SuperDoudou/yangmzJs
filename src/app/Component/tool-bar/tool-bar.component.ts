import {Component, Injectable, OnInit} from '@angular/core';
import {BaseDataService} from '../../Service/base-data-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor(
    public baseDataService: BaseDataService,
    private location: Location,
  ) { }


  ngOnInit() {
  }

  goBack(): void {
    for (let i = 0; i < this.baseDataService.locationExtraBackTime + 1; i++) {
      this.location.back();
    }
    this.baseDataService.locationExtraBackTime = 0;
  }

}
