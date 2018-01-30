import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisingComponent } from './advertising.component';
import { advertisingRouting } from './advertising.routing';

@NgModule({
  imports: [
    CommonModule,
    advertisingRouting
  ],
  declarations: [AdvertisingComponent]
})
export class AdvertisingModule { }
