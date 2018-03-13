import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import {
  MatExpansionModule, MatInputModule, MatProgressBarModule, MatSlideToggleModule,
  MatTabsModule
} from '@angular/material';
import {MyMaterialModuleModule} from '../my-material-module/my-material-module.module';
import {FormsModule} from '@angular/forms';
import {UserInfoPageComponent} from '../../Component/Page/user-info-page/user-info-page.component';
import {QRcodeModule} from '../util-module/qrcode-module.module';
const UserInfoRoutes: Routes = [
  {
    path: '',
    component: UserInfoPageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MyMaterialModuleModule,
    FormsModule,
    MatExpansionModule,
    MatProgressBarModule,
    RouterModule.forChild(UserInfoRoutes),
    QRcodeModule,
  ],
  exports: [
    MatTabsModule,
    MatSlideToggleModule,
    RouterModule
  ],
  declarations: [

    UserInfoPageComponent,
  ]
})
export class UserInfoPageModule { }
