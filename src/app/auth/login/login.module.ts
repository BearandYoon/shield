import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';

import { AuthHeaderModule } from '../auth-header/auth-header.module';
import { LoginRoutingModule } from './login-routing.module';
import { I18nModule } from '../../shared/i18n/i18n.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    ReCaptchaModule,
    AuthHeaderModule,
    I18nModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
