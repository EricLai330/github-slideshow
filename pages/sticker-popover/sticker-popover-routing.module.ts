import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StickerPopoverPage } from './sticker-popover.page';

const routes: Routes = [
  {
    path: '',
    component: StickerPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StickerPopoverPageRoutingModule {}
