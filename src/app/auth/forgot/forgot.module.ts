import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AuthHeaderModule } from '../auth-header/auth-header.module';
import { ForgotRoutingModule } from './forgot-routing.module';
import { I18nModule } from '../../shared/i18n/i18n.module';
import { ForgotComponent } from './forgot.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ForgotRoutingModule,
    ReCaptchaModule,
    AuthHeaderModule,
    I18nModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
