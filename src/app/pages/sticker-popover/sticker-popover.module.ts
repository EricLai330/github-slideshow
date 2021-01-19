import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StickerPopoverPageRoutingModule } from './sticker-popover-routing.module';

import { StickerPopoverPage } from './sticker-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickerPopoverPageRoutingModule
  ],
  declarations: [StickerPopoverPage]
})
export class StickerPopoverPageModule {}
