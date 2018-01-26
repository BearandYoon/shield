import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { JsonApiService } from './api/json-api.service'
import { LayoutService } from '../shared/layout/layout.service'
import { UserService } from '../shared/user/user.service'
import { VoiceControlService } from '../shared/voice-control/voice-control.service'
import {SoundService} from "../shared/sound/sound.service";

import { throwIfAlreadyLoaded } from './guards/module-import-guard';
import {VoiceRecognitionService} from "../shared/voice-control/voice-recognition.service";
import {TabsModule, ProgressbarModule, TooltipModule, BsDropdownModule, AlertModule} from "ngx-bootstrap";
import {AuthService} from "./auth/auth.service";
import {UserStorageService} from "./storage/storage.service";
import {AuthGuardService} from "./guards/auth-guard";
import {UnauthGuardService} from "./guards/unauth-guard";

import { TokensInterceptor } from './interceptors/tokens-interceptor';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    JsonApiService,
    LayoutService,
    UserService,
    VoiceControlService,
    VoiceRecognitionService,
    SoundService,
    CookieService,

    AuthService,
    UserStorageService,

    AuthGuardService,
    UnauthGuardService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokensInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
 }
