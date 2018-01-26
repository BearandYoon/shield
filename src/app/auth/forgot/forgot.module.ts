import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { SmartadminModule } from '../../shared/smartadmin.module';
import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgotRoutingModule,
    SmartadminModule,
    ReCaptchaModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
