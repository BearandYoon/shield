import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';

import { LoadingIndicatorModule } from '../../shared/ui/loading-indicator/loading-indicator.module';
import { campaignsRouting } from './campaigns.routing';
import { CampaignsComponent } from "./campaigns.component";
import { CampaignsService } from "./services/campaigns.service";
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { SmartadminInputModule } from "../../shared/forms/input/smartadmin-input.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        campaignsRouting,
        LoadingIndicatorModule,
        BsDatepickerModule.forRoot(),
        ModalModule.forRoot(),
        TagInputModule,
        SmartadminInputModule
    ],
    declarations: [
        CampaignsComponent,
        NewCampaignComponent
    ],
    providers: [CampaignsService],
    entryComponents: [NewCampaignComponent]
})
export class CampaignsModule { }
