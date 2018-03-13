import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { WritePageComponent } from '../../Component/Page/write-page/write-page.component';
import {MyMaterialModuleModule} from '../my-material-module/my-material-module.module';
import {WritePageTextComponent} from '../../Component/Page/write-page/write-page-text/write-page-text.component';
import {WritePageTextDirective} from '../../Component/Page/write-page/write-page-text.directive';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
const WriteRoutes: Routes = [
  {
    path: '',
    component: WritePageComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    MyMaterialModuleModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forChild(WriteRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    WritePageTextComponent,
    WritePageComponent,
    WritePageTextDirective,

  ],
  providers: [
  ],
  entryComponents: [
    WritePageTextComponent,
  ]
})
export class WritePageModule { }
