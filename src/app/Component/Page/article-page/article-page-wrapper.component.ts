import {
  Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, AfterContentInit,
  Input
} from '@angular/core';
import {BaseDataService} from '../../../Service/base-data-service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, ObservableInput} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpUriService} from '../../../Service/http-uri-service';
import {ArticlePageItemDirective} from './article-page-item.directive';
import {ComponentRef} from '@angular/core/src/linker/component_factory';
import {ArticlePageItemComponent} from './article-page-item/article-page-item.component';
import {UserService} from '../../../Service/user-service';
import {InfoBarService} from '../../../Service/info-bar-service';
import {DialogService} from '../../../Service/dialog-service';
import {ArticlePageCommentComponent} from './article-page-comment/article-page-comment.component';
import {HelperService} from '../../../Service/helper-service';
import {ReloadService} from "../../../Service/reload-service";
import {EventService} from "../../../Service/event-service";
@Component({
  selector: 'app-article-page-wrapper',
  templateUrl: './article-page-wrapper.component.html',
})
export class ArticlePageWrapperComponent {
  constructor(
    public reloadService: ReloadService,
    public eventService: EventService,
  ){}
}
