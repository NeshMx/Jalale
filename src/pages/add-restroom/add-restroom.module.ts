import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { AddRestroomPage } from './add-restroom';

@NgModule({
  declarations: [
    AddRestroomPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRestroomPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddRestroomPage
  ]
})
export class AddRestroomPageModule {}
