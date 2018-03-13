import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MyMaterialModuleModule } from './Module/my-material-module/my-material-module.module';

import { Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './Component/menu/menu.component';
import { ToolBarComponent } from './Component/tool-bar/tool-bar.component';
import { HomePageComponent } from './Component/Page/home-page/home-page.component';
import { AppRoutingModule } from './Module/app-routing/app-routing.module';
import { LoginDialogComponent} from './Component/dialog/login-dialog/login-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {HttpUriService} from './Service/http-uri-service';
import {FormsModule} from '@angular/forms';
import {UserService} from './Service/user-service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {DialogService} from './Service/dialog-service';
import {BaseDataService} from './Service/base-data-service';
import {InfoBarService, InfoBarComponent} from './Service/info-bar-service';
import {HelperService} from './Service/helper-service';
import {LinkService} from './Service/link-service';
import { OperationBarComponent } from './Component/operation-bar/operation-bar.component';
import {OperationItemCommentComponent} from './Component/operation-bar/operation-item/operation-item-comment.component';
import {OperationItemShareComponent} from './Component/operation-bar/operation-item/operation-item-share.component';
import {OperationItemLikeComponent} from './Component/operation-bar/operation-item/operation-item-like.component';
import {ReloadService} from './Service/reload-service';
import {ArticleListItemComponent} from './Component/article-list/ariticle-list-item/article-list-item.component';
import {ArticleListComponent} from './Component/article-list/article-list.component';
import {ArticleListItemDirective} from './Component/article-list/article-list-item.directive';
import {EventService} from './Service/event-service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolBarComponent,
    HomePageComponent,
    LoginDialogComponent,
    InfoBarComponent,
    ArticleListItemComponent,
    ArticleListComponent,
    ArticleListItemDirective,
    OperationBarComponent,
    OperationItemCommentComponent,
    OperationItemShareComponent,
    OperationItemLikeComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    CookieModule.forRoot(),
    HttpClientModule,
    MyMaterialModuleModule,
    FormsModule,
  ],
  providers: [
    CookieService,
    MatDialog,
    MatSnackBar,
    Title,
    HttpUriService,
    UserService,
    DialogService,
    BaseDataService,
    InfoBarService,
    HelperService,
    LinkService,
    ReloadService,
    EventService,
  ],
  entryComponents: [
    InfoBarComponent,
    LoginDialogComponent,
    ArticleListItemComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
