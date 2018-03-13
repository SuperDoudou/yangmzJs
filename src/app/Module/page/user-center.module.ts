import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import {UserCenterPageComponent} from '../../Component/Page/user-center-page/user-center-page.component';
import {
  MatExpansionModule, MatInputModule, MatProgressBarModule, MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import {MyMaterialModuleModule} from '../my-material-module/my-material-module.module';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {UserSocialAccountComponent} from "../../Component/Page/user-center-page/user-social-account/user-social-account.component";
const UserCenterRoutes: Routes = [
  {
    path: '',
    component: UserCenterPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatSlideToggleModule,
    FileUploadModule,
    MyMaterialModuleModule,
    FormsModule,
    MatExpansionModule,
    MatProgressBarModule,
    RouterModule.forChild(UserCenterRoutes)
  ],
  exports: [
    MatTabsModule,
    MatSlideToggleModule,
    RouterModule
  ],
  declarations: [
    UserCenterPageComponent,
    UserSocialAccountComponent,
  ]
})
export class UserCenterPageModule { }
