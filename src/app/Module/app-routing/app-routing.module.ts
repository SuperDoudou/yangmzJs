import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { HomePageComponent } from '../../Component/Page/home-page/home-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'article/:id',
    loadChildren: 'app/Module/page/article-page.module#ArticlePageModule',
    pathMatch: 'full'
  },
  {
    path: 'usercenter',
    loadChildren: 'app/Module/page/user-center.module#UserCenterPageModule',
    pathMatch: 'full'
  },
  {
    path: 'userinfo/:id',
    loadChildren: 'app/Module/page/user-info.module#UserInfoPageModule',
    pathMatch: 'full'
  },
  {
    path: 'write',
    loadChildren: 'app/Module/page/write-page.module#WritePageModule',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
      // debug!!!
      // { enableTracing: true }
    ),
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AppRoutingModule { }
