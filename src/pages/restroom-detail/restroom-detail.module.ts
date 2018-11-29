import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestroomDetailPage } from './restroom-detail';

@NgModule({
  declarations: [
    RestroomDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RestroomDetailPage),
  ],
})
export class RestroomDetailPageModule {}
