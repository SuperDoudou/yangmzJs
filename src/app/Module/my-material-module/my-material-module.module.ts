import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatInputModule, MatListModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatDialogModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatGridListModule,
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatGridListModule,
  ],
  declarations: [],
  providers: [
    // {provide: MAT_DATE_LOCALE, useValue: 'zh-cn'},
  ],
})
export class MyMaterialModuleModule { }
