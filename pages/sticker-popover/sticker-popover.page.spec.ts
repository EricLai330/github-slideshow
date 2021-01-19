import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StickerPopoverPage } from './sticker-popover.page';

describe('StickerPopoverPage', () => {
  let component: StickerPopoverPage;
  let fixture: ComponentFixture<StickerPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickerPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StickerPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
