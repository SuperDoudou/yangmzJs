import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BaseDataService} from '../../../Service/base-data-service';
import {WritePageTextDirective} from './write-page-text.directive';
import {WritePageTextComponent} from './write-page-text/write-page-text.component';
import {FileUploader, FileUploaderOptions} from 'ng2-file-upload';
import {CookieService} from 'ngx-cookie';
import {HttpUriService} from '../../../Service/http-uri-service';
import {FileItem} from 'ng2-file-upload/file-upload/file-item.class';
import {ComponentRef} from '@angular/core/src/linker/component_factory';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserService} from '../../../Service/user-service';
import {InfoBarService} from '../../../Service/info-bar-service';
import {HelperService} from '../../../Service/helper-service';

@Component({
  selector: 'app-write-page',
  templateUrl: './write-page.component.html',
  styleUrls: ['./write-page.component.css']
})
export class WritePageComponent implements OnInit {

  private writeTitle = '晒照';
  private options: FileUploaderOptions;
  private url = '';
  public inputUserName = '';
  public uploader: FileUploader;
  public filePath = '';
  private handleIndex = 0;
  public isUploadImage = false;
  private textFactory: any;
  private viewContainerRef: any;
  public title = '';
  public text: string;
  private textItems: ComponentRef<WritePageTextComponent>[] = [];
  @ViewChild(WritePageTextDirective) writePageTextDirective: WritePageTextDirective;


  constructor(
    private baseDataService: BaseDataService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cookieService: CookieService,
    private httpUriService: HttpUriService,
    private userService: UserService,
    private helper: HelperService,
    public writePageBar: InfoBarService,
  ) {
    this.textFactory = componentFactoryResolver.resolveComponentFactory(WritePageTextComponent);
    this.url = httpUriService.uploadArticleImage;
    this.options = {
      autoUpload: true,
      removeAfterUpload: true,
      url: this.url
    };
    this.uploader = new FileUploader(this.options);
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => this.onBeforeUpload(fileItem);
    this.uploader.onCompleteItem = (fileItem: FileItem, response: string) => this.onCompleteUpload(fileItem, response);
  }


  public uploadArticle() {
    console.log('Enter uploadArticle');
    if ( this.title == null || this.title.length < 6 ) {
      this.writePageBar.open('标题过短', '');
      return;
    }
    let text = '';
    for (const textItem of this.textItems) {
      text += 'imageId_yangmz={' + textItem.instance.imageId + '}';
      text += 'text_yangmz={' + textItem.instance.text + '}';
    }
    const params = new Map().set('userId', this.userService.userId)
      .set('token', this.userService.token)
      .set('title', this.title)
      .set('text', text);
    this.helper.httpPost(this.httpUriService.uploadArticle,
      params)
      .subscribe(data => {
        // Read the result field from the JSON response.
        if ( data['result'] === 'success' ) {
          this.writePageBar.open('上传文章', '成功');
        }
      });
  }

  private onCompleteUpload(fileItem: FileItem, response: string) {
    this.isUploadImage = true;
    const data = JSON.parse(response);
    if ( data['result'] !== 'success') {
      return;
    }
    this.textItems[data['index']].instance.imageId = data['id'];
    this.textItems[data['index']].instance.imageSrc = this.httpUriService.baseUrl + data['address'];
  }

  private onBeforeUpload(fileItem: FileItem) {
    const index = this.handleIndex;
    this.uploader.options.additionalParameter = {
      'userId': this.userService.userId,
      'token': this.userService.token,
      'index': index,
    };

    this.handleIndex++;
    const reader = new FileReader();
    reader.onloadend = () => {
      // result;
      this.textItems[index].instance.initSrc(reader.result);
    };
    this.viewContainerRef = this.writePageTextDirective.viewContainerRef;
    this.textItems.push(this.viewContainerRef.createComponent(this.textFactory) ) ;
    reader.readAsDataURL(fileItem._file);
  }

  public onUploadImage(event: any) {

  }
  ngOnInit() {
    this.baseDataService.toolBarTitle = this.writeTitle;
    this.baseDataService.title = this.writeTitle;
  }

  public addOneText() {


  }



}
