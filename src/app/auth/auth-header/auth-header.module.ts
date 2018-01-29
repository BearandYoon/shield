import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nModule } from '../../shared/i18n/i18n.module';
import {AuthHeaderComponent} from "./auth-header.component";


@NgModule({
    imports: [
        CommonModule,
        I18nModule
    ],
    declarations: [AuthHeaderComponent],
    exports: [AuthHeaderComponent]
})
export class AuthHeaderModule { }