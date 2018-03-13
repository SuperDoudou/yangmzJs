import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import {MyMaterialModuleModule} from '../my-material-module/my-material-module.module';
import {FormsModule} from '@angular/forms';
import {ArticlePageComponent} from '../../Component/Page/article-page/article-page.component';
import {ArticlePageItemComponent} from '../../Component/Page/article-page/article-page-item/article-page-item.component';
import {ArticlePageItemDirective} from '../../Component/Page/article-page/article-page-item.directive';
import {ArticlePageCommentComponent} from '../../Component/Page/article-page/article-page-comment/article-page-comment.component';
import {ArticlePageWrapperComponent} from '../../Component/Page/article-page/article-page-wrapper.component';
import {ArticleCommentDialogComponent} from "../../Component/dialog/article-comment-dialog/article-comment-dialog.component";
const ArticleRoutes: Routes = [
  {
    path: '',
    component: ArticlePageWrapperComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    MyMaterialModuleModule,
    FormsModule,
    RouterModule.forChild(ArticleRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ArticlePageComponent,
    ArticlePageItemComponent,
    ArticlePageItemDirective,
    ArticlePageCommentComponent,
    ArticlePageWrapperComponent,
    ArticleCommentDialogComponent,
  ],
  providers: [
  ],
  entryComponents: [
    ArticlePageItemComponent,
    ArticlePageCommentComponent,
    ArticleCommentDialogComponent,
  ]
})
export class ArticlePageModule { }
